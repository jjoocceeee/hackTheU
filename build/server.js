require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "991487bbc1a70ff211dc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"server": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"vendors~about~admin~contact~home~login~not-found~privacy~register":"vendors~about~admin~contact~home~login~not-found~privacy~register","about~admin~contact~home~login~not-found~privacy~register":"about~admin~contact~home~login~not-found~privacy~register","about":"about","admin":"admin","contact":"contact","home":"home","login":"login","not-found":"not-found","privacy":"privacy","register":"register"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/client/components/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  // Universal HTTP client
  fetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  pathname: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  query: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(this.props.children);
  }

}

_defineProperty(App, "propTypes", {
  context: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape(ContextType).isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element.isRequired
});

_defineProperty(App, "childContextTypes", ContextType);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./app/client/components/Html.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Projects\\hackTheU\\app\\client\\components\\Html.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



/* eslint-disable react/no-danger */

class Html extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      title,
      description,
      styles,
      scripts,
      app,
      children
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("html", {
      className: "no-js",
      lang: "en",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("head", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      charSet: "utf-8",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      httpEquiv: "x-ua-compatible",
      content: "ie=edge",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      },
      __self: this
    }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      name: "description",
      content: description,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }), scripts.map(script => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      key: script,
      rel: "preload",
      href: script,
      as: "script",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      rel: "manifest",
      href: "/site.webmanifest",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
      rel: "apple-touch-icon",
      href: "/icon.png",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), styles.map(style => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
      key: style.id,
      id: style.id,
      dangerouslySetInnerHTML: {
        __html: style.cssText
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("body", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "app",
      dangerouslySetInnerHTML: {
        __html: children
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `window.App=${serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default()(app)}`
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }), scripts.map(script => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      key: script,
      src: script,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    })), process.env.GOOGLETRACKINGID && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${process.env.GOOGLETRACKINGID}','auto');ga('send','pageview')`
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }), process.env.GOOGLETRACKINGID && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
      src: "https://www.google-analytics.com/analytics.js",
      async: true,
      defer: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    })));
  }

}

_defineProperty(Html, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  styles: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    cssText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired),
  scripts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired),
  app: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  // eslint-disable-line
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

_defineProperty(Html, "defaultProps", {
  styles: [],
  scripts: []
});

/* harmony default export */ __webpack_exports__["default"] = (Html);

/***/ }),

/***/ "./app/client/router.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("universal-router");
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(universal_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/client/routes/index.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/* harmony default export */ __webpack_exports__["default"] = (new universal_router__WEBPACK_IMPORTED_MODULE_0___default.a(_routes__WEBPACK_IMPORTED_MODULE_1__["default"], {
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(action => action.default(context, params));
    }

    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }

    return undefined;
  }

}));

/***/ }),

/***/ "./app/client/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./app/client/routes/error/ErrorPage.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./app/client/routes/error/ErrorPage.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./app/client/routes/error/ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./app/client/routes/error/ErrorPage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPageWithoutStyle", function() { return ErrorPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/client/routes/error/ErrorPage.css");
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\Projects\\hackTheU\\app\\client\\routes\\error\\ErrorPage.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class ErrorPage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    if (true && this.props.error) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        },
        __self: this
      }, this.props.error.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, this.props.error.stack));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, "Error"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, "Sorry, a critical error occurred on this page."));
  }

}

_defineProperty(ErrorPage, "propTypes", {
  error: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    stack: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  })
});

_defineProperty(ErrorPage, "defaultProps", {
  error: null
});


/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default.a)(ErrorPage));

/***/ }),

/***/ "./app/client/routes/error/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/client/routes/error/ErrorPage.js");
var _jsxFileName = "C:\\Projects\\hackTheU\\app\\client\\routes\\error\\index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



function action() {
  return {
    title: 'Demo Error',
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    })
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ "./app/client/routes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
// The top-level (parent) route
const routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [{
    path: '',
    load: () => Promise.all(/* import() | home */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("home")]).then(__webpack_require__.bind(null, "./app/client/routes/home/index.js"))
  }, {
    path: '/contact',
    load: () => Promise.all(/* import() | contact */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("contact")]).then(__webpack_require__.bind(null, "./app/client/routes/contact/index.js"))
  }, {
    path: '/login',
    load: () => Promise.all(/* import() | login */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("login")]).then(__webpack_require__.bind(null, "./app/client/routes/login/index.js"))
  }, {
    path: '/register',
    load: () => Promise.all(/* import() | register */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("register")]).then(__webpack_require__.bind(null, "./app/client/routes/register/index.js"))
  }, {
    path: '/about',
    load: () => Promise.all(/* import() | about */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about")]).then(__webpack_require__.bind(null, "./app/client/routes/about/index.js"))
  }, {
    path: '/privacy',
    load: () => Promise.all(/* import() | privacy */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("privacy")]).then(__webpack_require__.bind(null, "./app/client/routes/privacy/index.js"))
  }, {
    path: '/admin',
    load: () => Promise.all(/* import() | admin */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("admin")]).then(__webpack_require__.bind(null, "./app/client/routes/admin/index.js"))
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: () => Promise.all(/* import() | not-found */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("not-found")]).then(__webpack_require__.bind(null, "./app/client/routes/not-found/index.js"))
  }],

  action({
    next
  }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next(); // Provide default values for title, description etc.

      route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
      route.description = route.description || '';
      return route;
    })();
  }

}; // The error page is available by permanent url for development mode

if (true) {
  routes.children.unshift({
    path: '/error',
    action: __webpack_require__("./app/client/routes/error/index.js").default
  });
}

/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./app/composers/googleUserTC.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleUserTC", function() { return GoogleUserTC; });
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql-compose-mongoose/node8");
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/models/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("graphql-compose");
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types_googleId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/types/googleId.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






const customizationOptions = {
  name: "GoogleUser",
  description: "A search query that is useful for analytics.",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['query'],
        removeFields: ['createdAt', 'updatedAt', '_id']
      }
    },
    updateById: {
      record: {
        removeFields: ['createdAt', 'updatedAt']
      }
    }
  }
};
const GoogleUserTC = Object(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__["composeWithMongoose"])(_models__WEBPACK_IMPORTED_MODULE_1__["GoogleUser"], customizationOptions);
/* harmony default export */ __webpack_exports__["default"] = (GoogleUserTC); // ======================= Fields ==============================

GoogleUserTC.extendField('id', {
  type: _types_googleId__WEBPACK_IMPORTED_MODULE_4__["GraphQLGoogleId"]
}); // ======================= Relations ==============================
// ======================= Resolvers ==============================

GoogleUserTC.getResolver('updateOne').getArgTC('filter').extendField('id', {
  type: _types_googleId__WEBPACK_IMPORTED_MODULE_4__["GraphQLGoogleId"]
});
GoogleUserTC.addResolver(new graphql_compose__WEBPACK_IMPORTED_MODULE_3__["Resolver"]({
  name: 'findByGoogleId',
  description: 'Find a google user with a google id.',
  type: GoogleUserTC.getResolver('findById').getType(),
  // or GraphQLOutputType
  args: {
    id: {
      type: new graphql__WEBPACK_IMPORTED_MODULE_2__["GraphQLNonNull"](_types_googleId__WEBPACK_IMPORTED_MODULE_4__["GraphQLGoogleId"])
    }
  },
  resolve: function () {
    var _ref = _asyncToGenerator(function* ({
      source,
      args,
      context,
      info
    }) {
      return yield _models__WEBPACK_IMPORTED_MODULE_1__["GoogleUser"].findOne({
        id: args.id
      });
    });

    return function resolve(_x) {
      return _ref.apply(this, arguments);
    };
  }()
}));

/***/ }),

/***/ "./app/composers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userTC__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/composers/userTC.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserTC", function() { return _userTC__WEBPACK_IMPORTED_MODULE_0__["UserTC"]; });

/* harmony import */ var _googleUserTC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/composers/googleUserTC.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GoogleUserTC", function() { return _googleUserTC__WEBPACK_IMPORTED_MODULE_1__["GoogleUserTC"]; });

/* harmony import */ var _socialProfileTC__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/composers/socialProfileTC.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialProfileTC", function() { return _socialProfileTC__WEBPACK_IMPORTED_MODULE_2__["SocialProfileTC"]; });





/***/ }),

/***/ "./app/composers/socialProfileTC.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialProfileTC", function() { return SocialProfileTC; });
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql-compose-mongoose/node8");
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/models/index.js");
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql-compose");
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: [],
        removeFields: ['_id', 'createdAt', 'updatedAt']
      }
    }
  }
};
const SocialProfileTC = Object(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__["composeWithMongoose"])(_models__WEBPACK_IMPORTED_MODULE_1__["SocialProfile"], customizationOptions);
/* harmony default export */ __webpack_exports__["default"] = (SocialProfileTC);
SocialProfileTC.addResolver(new graphql_compose__WEBPACK_IMPORTED_MODULE_2__["Resolver"]({
  name: 'facebookEngagements',
  description: 'bla',
  resolve: function () {
    var _ref = _asyncToGenerator(function* ({
      source,
      args,
      context,
      info
    }) {
      var res = yield context.fb.api("me/feed?fields=reactions.summary(true)", {
        access_token: process.env.ACCESS_TOKEN
      });
      console.log(res.data[0].reactions);
      return null;
    });

    return function resolve(_x) {
      return _ref.apply(this, arguments);
    };
  }()
}));

/***/ }),

/***/ "./app/composers/userTC.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTC", function() { return UserTC; });
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql-compose-mongoose/node8");
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/models/index.js");


const customizationOptions = {
  description: "The main user",
  resolvers: {
    createOne: {
      record: {
        requiredFields: ['username'],
        removeFields: ['_id', 'createdAt', 'updatedAt']
      }
    }
  }
};
const UserTC = Object(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_0__["composeWithMongoose"])(_models__WEBPACK_IMPORTED_MODULE_1__["User"], customizationOptions);
/* harmony default export */ __webpack_exports__["default"] = (UserTC);

/***/ }),

/***/ "./app/context.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["default"] = (context => _objectSpread({
  isAdmin: context.req.user != null ? context.req.user.roles.includes("admin") == true : false,
  user: context.req.user,
  ipAddress: context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress
}, context));

/***/ }),

/***/ "./app/createFetch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, {
  baseUrl,
  cookie,
  schema,
  graphql
}) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _objectSpread({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? {
      Cookie: cookie
    } : null)
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (url, options) {
        const isGraphQL = url.startsWith('/graphql');

        if (schema && graphql && isGraphQL) {
          // We're SSR, so route the graphql internal to avoid latency
          const query = JSON.parse(options.body);
          const result = yield graphql(schema, query.query, {
            request: {}
          }, // fill in request vars needed by graphql
          null, query.variables);
          return Promise.resolve({
            status: result.errors ? 400 : 200,
            json: () => Promise.resolve(result)
          });
        }

        return isGraphQL || url.startsWith('/api') ? fetch(`${baseUrl}${url}`, _objectSpread({}, defaults, options, {
          headers: _objectSpread({}, defaults.headers, options && options.headers)
        })) : fetch(url, options);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

/* harmony default export */ __webpack_exports__["default"] = (createFetch);

/***/ }),

/***/ "./app/models/googleUser.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleUser", function() { return GoogleUser; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var findorcreate_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("findorcreate-promise");
/* harmony import */ var findorcreate_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(findorcreate_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var GoogleUserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    description: "The google id of the user."
  },
  emails: {
    type: [new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
      email: {
        type: String,
        index: true
      },
      type: {
        type: String
      }
    })],
    index: true,
    required: true
  },
  displayName: {
    type: String,
    description: 'The display name on Google for the user.'
  },
  image: new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    url: {
      type: String
    },
    isDefault: {
      type: Boolean
    }
  }),
  aboutMe: {
    type: String,
    description: 'A short biography for this person.'
  },
  gender: {
    type: String,
    index: true,
    description: 'The person\'s gender.'
  },
  isPlusUser: {
    type: Boolean,
    description: 'Whether the user is a Google Plus user.'
  },
  url: {
    type: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema.Types.Url,
    description: 'The URL of this person\'s profile.'
  },
  language: {
    type: String,
    description: 'The user\'s language.',
    index: true
  },
  verified: {
    type: Boolean,
    description: 'Whether the person or Google+ Page has been verified.'
  }
}, {
  timestamps: true
});
GoogleUserSchema.plugin(findorcreate_promise__WEBPACK_IMPORTED_MODULE_1___default.a);
GoogleUserSchema.index({
  "createdAt": 1
});
GoogleUserSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (next) {
    if (!this.isNew) return next();
    return next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
GoogleUserSchema.pre('remove',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (next) {
    return next();
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
const GoogleUser = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('GoogleUser', GoogleUserSchema);

/***/ }),

/***/ "./app/models/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/models/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _user__WEBPACK_IMPORTED_MODULE_0__["User"]; });

/* harmony import */ var _googleUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/models/googleUser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GoogleUser", function() { return _googleUser__WEBPACK_IMPORTED_MODULE_1__["GoogleUser"]; });

/* harmony import */ var _socialProfile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/models/socialProfile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialProfile", function() { return _socialProfile__WEBPACK_IMPORTED_MODULE_2__["SocialProfile"]; });





/***/ }),

/***/ "./app/models/socialProfile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialProfile", function() { return SocialProfile; });
const mongoose = __webpack_require__("mongoose");

const Types = mongoose.Schema.Types;
const SocialProfileSchema = new mongoose.Schema({
  interactions: {
    type: Number,
    description: "The total number of interactions with a users' posts.",
    index: true
  }
}, {
  timestamps: true
});
const SocialProfile = mongoose.model('SocialProfile', SocialProfileSchema);
/* harmony default export */ __webpack_exports__["default"] = (SocialProfile);

/***/ }),

/***/ "./app/models/user.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const mongoose = __webpack_require__("mongoose");

const Types = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "The name that is publically displayed",
    index: true
  },
  googleId: {
    type: Types.ObjectId,
    ref: 'GoogleUser',
    description: 'The id of the google user in the database.',
    index: true
  },
  socialIds: {
    type: [{
      type: Types.ObjectId,
      ref: 'GoogleUser'
    }],
    description: 'The ids of a users social profiles.'
  }
}, {
  timestamps: true
});
UserSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (next) {
    return next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
const User = mongoose.model('User', UserSchema);
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./app/oauth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OAuth", function() { return OAuth; });
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/models/user.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






const SaveRedirect = (req, res, next) => {
  req.session.redirect = {
    pass: req.query.pass,
    fail: req.query.fail
  };
  next();
};

const HandleRedirect = ({
  req,
  res,
  pass
}) => {
  if (pass && req.session.redirect && req.session.redirect.pass) {
    const redirect = req.session.redirect;
    delete req.session.redirect;
    res.redirect(redirect.pass);
  } else if (!pass && req.session.redirect && req.session.redirect.fail) {
    const redirect = req.session.redirect;
    delete req.session.redirect;
    res.redirect(redirect.fail);
  } else {
    if (req.session.redirect) {
      delete req.session.redirect;
    }

    res.redirect(`${process.env.WEB_URI}${DEVELOPMENT ? '/graphiql' : '/'}`);
  }
};

const GenerateJwt = (req, res) => {
  const user = req.session.passport.user; // generate login token

  const tokenPayload = {
    user: user._id,
    exp: moment__WEBPACK_IMPORTED_MODULE_2___default()().add(30, 'days').unix()
  };
  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.sign(tokenPayload, process.env.JWT_SECRET);
  let opts = !DEVELOPMENT ? {
    secure: true,
    domain: process.env.JWT_DOMAIN
  } : {}; // Increment signInCount and save lastIp

  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  _models_user__WEBPACK_IMPORTED_MODULE_3__["User"].update({
    _id: user._id
  }, {
    $set: {
      lastIp: ipAddress
    },
    $inc: {
      signInCount: 1
    }
  }).exec(); // Send the jwt cookie to the client.

  res.cookie('jwt', token, opts);
};

const OAuth = app => {
  app.get('/auth/verify',
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(function* (req, res) {
      yield _models_user__WEBPACK_IMPORTED_MODULE_3__["User"].update({
        "emailVerification.hash": req.query.id
      }, {
        $set: {
          verified: true,
          emailVerification: null
        }
      });
      res.redirect(req.query.redirect || process.env.WEB_URI);
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/auth/fail', (req, res) => {
    HandleRedirect({
      req,
      res,
      pass: false
    });
  });
  app.get('/auth/google', SaveRedirect, passport__WEBPACK_IMPORTED_MODULE_0___default.a.authenticate('google', {
    scope: ['email', 'profile']
  }));
  app.get('/auth/google/callback', passport__WEBPACK_IMPORTED_MODULE_0___default.a.authenticate('google', {
    failureRedirect: '/auth/fail'
  }), (req, res) => {
    GenerateJwt(req, res);
    HandleRedirect({
      req,
      res,
      pass: true
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (OAuth);

/***/ }),

/***/ "./app/oauth/google.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "googleStrategy", function() { return googleStrategy; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("passport-google-oauth20");
/* harmony import */ var passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/oauth/oauth.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/models/user.js");
/* harmony import */ var _models_googleUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/models/googleUser.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







const extractProfile = profile => {
  let imageUrl = '';

  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }

  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
};

const googleStrategy = new passport_google_oauth20__WEBPACK_IMPORTED_MODULE_1__["Strategy"]({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.WEB_URI}/auth/google/callback`,
  passReqToCallback: true
},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, accessToken, refreshToken, profile, done) {
    try {
      const user = yield Handler({
        req,
        accessToken,
        refreshToken,
        profile
      });

      if (user) {
        req.info = {}; // Add this so it logs to analytics.

        LogAction(req, 'userSignInGoogle', {
          userId: user._id
        });
        done(null, user);
      } else {
        console.log(`Failed to get user for: ${profile.id}`);
        done(null, null);
      }
    } catch (err) {
      console.log(err);
      if (DEVELOPMENT) done(err, null, {
        message: err
      });else done(null, null);
    }
  });

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());

const Handler =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* ({
    req,
    accessToken,
    refreshToken,
    profile
  }) {
    let user = yield Object(_oauth__WEBPACK_IMPORTED_MODULE_2__["GetUser"])({
      req,
      verified: true,
      email: profile.emails[0].value,
      username: profile.id
    });
    let gu = yield CreateGoogleUser(profile);
    yield _models_user__WEBPACK_IMPORTED_MODULE_3__["User"].update({
      _id: user._id
    }, {
      $set: {
        googleId: gu._id
      },
      $inc: {
        signInCount: 1
      }
    });
    return user;
  });

  return function Handler(_x6) {
    return _ref2.apply(this, arguments);
  };
}();

const CreateGoogleUser =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (profile) {
    let values = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(profile, ['id', 'emails', 'gender', 'displayName']);

    values = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(values, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pick(profile._json, ['language', 'aboutMe', 'url', 'image', 'isPlusUser', 'verified']));
    const res = yield _models_googleUser__WEBPACK_IMPORTED_MODULE_4__["GoogleUser"].findOrCreate({
      id: profile.id
    }, values, {
      upsert: true
    });
    if (res.errors) console.log(res.errors);
    return res.result;
  });

  return function CreateGoogleUser(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (googleStrategy);

/***/ }),

/***/ "./app/oauth/oauth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetUser", function() { return GetUser; });
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/models/user.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const GetUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* ({
    req,
    email,
    username,
    verified = true
  }) {
    let user;

    if (req.session && req.session.passport && req.session.passport.user) {
      // Use the already logged in user.
      user = req.session.passport.user;
    } else {
      // Find or create a user for the discord email.
      if (!verified) throw new Error('Email not verified with auth provider.');
      let res = yield _models_user__WEBPACK_IMPORTED_MODULE_0__["User"].findOrCreate({
        email: email
      }, {
        email: email,
        username: username,
        username_unique: username
      });
      if (res.errors) throw new Error(JSON.stringify(res.errors));
      user = res.result;
    }

    return user;
  });

  return function GetUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./app/passport.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app/models/user.js");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("passport-jwt");
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _oauth_google__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./app/oauth/google.js");





passport__WEBPACK_IMPORTED_MODULE_1___default.a.use(_oauth_google__WEBPACK_IMPORTED_MODULE_4__["default"]);

const cookieExtractor = req => {
  return req && req.cookies ? req.cookies.jwt : null;
};

let opts = {
  jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_3__["ExtractJwt"].fromExtractors([passport_jwt__WEBPACK_IMPORTED_MODULE_3__["ExtractJwt"].fromAuthHeaderAsBearerToken(), cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
};
passport__WEBPACK_IMPORTED_MODULE_1___default.a.use(new passport_jwt__WEBPACK_IMPORTED_MODULE_3__["Strategy"](opts, (jwt_payload, done) => {
  if (!jwt_payload.user) console.warn(`User not found in jwt payload.`);
  _models_user__WEBPACK_IMPORTED_MODULE_2__["User"].findById(jwt_payload.user, (err, user) => {
    return done(err, user);
  });
}));
passport__WEBPACK_IMPORTED_MODULE_1___default.a.serializeUser(function (user, done) {
  done(null, user);
});
passport__WEBPACK_IMPORTED_MODULE_1___default.a.deserializeUser(function (user, done) {
  done(null, user);
});

/***/ }),

/***/ "./app/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql-compose-mongoose/node8");
/* harmony import */ var graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_compose_mongoose_node8__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql-compose");
/* harmony import */ var graphql_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app/schemas/index.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





graphql_compose__WEBPACK_IMPORTED_MODULE_2__["schemaComposer"].Query.addFields(_objectSpread({}, _schemas__WEBPACK_IMPORTED_MODULE_3__["UserQueries"], _schemas__WEBPACK_IMPORTED_MODULE_3__["SocialProfileQueries"]));
graphql_compose__WEBPACK_IMPORTED_MODULE_2__["schemaComposer"].Mutation.addFields(_objectSpread({}, _schemas__WEBPACK_IMPORTED_MODULE_3__["UserMutations"], _schemas__WEBPACK_IMPORTED_MODULE_3__["SocialProfileMutations"]));
const graphqlSchema = graphql_compose__WEBPACK_IMPORTED_MODULE_2__["schemaComposer"].buildSchema();
/* harmony default export */ __webpack_exports__["default"] = (graphqlSchema);

/***/ }),

/***/ "./app/schemas/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userSchema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/schemas/userSchema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserQueries", function() { return _userSchema__WEBPACK_IMPORTED_MODULE_0__["UserQueries"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserMutations", function() { return _userSchema__WEBPACK_IMPORTED_MODULE_0__["UserMutations"]; });

/* harmony import */ var _socialProfileSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app/schemas/socialProfileSchema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialProfileQueries", function() { return _socialProfileSchema__WEBPACK_IMPORTED_MODULE_1__["SocialProfileQueries"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialProfileMutations", function() { return _socialProfileSchema__WEBPACK_IMPORTED_MODULE_1__["SocialProfileMutations"]; });




/***/ }),

/***/ "./app/schemas/socialProfileSchema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialProfileQueries", function() { return SocialProfileQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialProfileMutations", function() { return SocialProfileMutations; });
/* harmony import */ var _composers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/composers/index.js");

const SocialProfileQueries = {
  socialProfileById: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('findById'),
  socialProfileByIds: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('findByIds'),
  socialProfileOne: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('findOne'),
  socialProfileMany: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('findMany'),
  socialProfileCount: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('count'),
  socialProfileConnection: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('connection'),
  socialProfilePagination: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('pagination'),
  socialEngagementCount: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('facebookEngagements')
};
const SocialProfileMutations = {
  socialProfileCreate: _composers__WEBPACK_IMPORTED_MODULE_0__["SocialProfileTC"].getResolver('createOne') // socialProfileUpdateById: SocialProfileTC.getResolver('updateById'),
  // socialProfileUpdateOne: SocialProfileTC.getResolver('updateOne'),
  // socialProfileUpdateMany: SocialProfileTC.getResolver('updateMany'),
  // socialProfileRemoveById: SocialProfileTC.getResolver('removeById'),
  // socialProfileRemoveOne: SocialProfileTC.getResolver('removeOne'),
  // socialProfileRemoveMany: SocialProfileTC.getResolver('removeMany'),

};

/***/ }),

/***/ "./app/schemas/userSchema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserQueries", function() { return UserQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserMutations", function() { return UserMutations; });
/* harmony import */ var _composers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./app/composers/index.js");

const UserQueries = {
  userById: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('findById'),
  userByIds: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('findByIds'),
  userOne: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('findOne'),
  userMany: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('findMany'),
  userCount: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('count'),
  userConnection: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('connection'),
  userPagination: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('pagination')
};
const UserMutations = {
  userCreate: _composers__WEBPACK_IMPORTED_MODULE_0__["UserTC"].getResolver('createOne') // userUpdateById: UserTC.getResolver('updateById'),
  // userUpdateOne: UserTC.getResolver('updateOne'),
  // userUpdateMany: UserTC.getResolver('updateMany'),
  // userRemoveById: UserTC.getResolver('removeById'),
  // userRemoveOne: UserTC.getResolver('removeOne'),
  // userRemoveMany: UserTC.getResolver('removeMany'),

};

/***/ }),

/***/ "./app/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _client_components_App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./app/client/components/App.js");
/* harmony import */ var _client_components_Html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./app/client/components/Html.js");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _createFetch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./app/createFetch.js");
/* harmony import */ var _client_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./app/client/router.js");
/* harmony import */ var mongoose_type_email__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("mongoose-type-email");
/* harmony import */ var mongoose_type_email__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(mongoose_type_email__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var mongoose_type_url__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("mongoose-type-url");
/* harmony import */ var mongoose_type_url__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(mongoose_type_url__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./app/oauth.js");
/* harmony import */ var fb__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("fb");
/* harmony import */ var fb__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(fb__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var graphql_voyager_middleware__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("graphql-voyager/middleware");
/* harmony import */ var graphql_voyager_middleware__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(graphql_voyager_middleware__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./app/schema.js");
var _jsxFileName = "C:\\Projects\\hackTheU\\app\\server.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();










 // eslint-disable-line import/no-unresolved



global.appRoot = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname);
global.DEVELOPMENT = !"development" || "development" === 'development';
const app = express__WEBPACK_IMPORTED_MODULE_4___default()(); // ============== DATABASE =============

const mongoose = __webpack_require__("mongoose");



console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Database connected.')); // ============== /DATABASE =============
// ============== MIDDLEWARE =============

const MongoStore = __webpack_require__("connect-mongo")(express_session__WEBPACK_IMPORTED_MODULE_5___default.a);

app.use(express_session__WEBPACK_IMPORTED_MODULE_5___default()({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

const passport = __webpack_require__("passport");

const passportAuth = __webpack_require__("./app/passport.js");

const morgan = __webpack_require__("morgan");

app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.urlencoded({
  extended: true
}));
app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.json()); // app.use(express.static('public'));

app.use(morgan('combined', {
  skip: function (req, res) {
    return res.statusCode < 400;
  }
}));
app.use(__webpack_require__("cookie-parser")());
app.use(passport.initialize()); // ============== /MIDDLEWARE =============
// ============== OAUTH =============


Object(_oauth__WEBPACK_IMPORTED_MODULE_16__["default"])(app); // ============== /OAUTH =============
// ============== PUBLIC =============

app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static(__webpack_require__("path").join(__dirname, "public"), {
  extensions: ['html']
})); // ============== /PUBLIC =============
// ============== API =============


const fb = new fb__WEBPACK_IMPORTED_MODULE_17__["Facebook"](); // ============== /API =============
// ============== REACT SERVER SIDE RENDERING =============
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const css = new Set(); // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader

      const insertCss = (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      }; // Universal HTTP client


      const fetch = Object(_createFetch__WEBPACK_IMPORTED_MODULE_12__["default"])(node_fetch__WEBPACK_IMPORTED_MODULE_6___default.a, {
        baseUrl: process.env.WEB_URI,
        cookie: req.headers.cookie // schema,
        // graphql,

      }); // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html

      const context = {
        insertCss,
        fetch,
        // The twins below are wild, be careful!
        pathname: req.path,
        query: req.query
      };
      const route = yield _client_router__WEBPACK_IMPORTED_MODULE_13__["default"].resolve(context);

      if (route.redirect) {
        res.redirect(route.status || 302, route.redirect);
        return;
      }

      const data = _objectSpread({}, route);

      data.children = react_dom_server__WEBPACK_IMPORTED_MODULE_8___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_client_components_App__WEBPACK_IMPORTED_MODULE_9__["default"], {
        context: context,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, route.component));
      data.styles = [{
        id: 'css',
        cssText: [...css].join('')
      }];
      const scripts = new Set();

      const addChunk = chunk => {
        if (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_11___default.a[chunk]) {
          _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_11___default.a[chunk].forEach(asset => scripts.add(asset));
        } else if (DEVELOPMENT) {
          throw new Error(`Chunk with name '${chunk}' cannot be found`);
        }
      };

      addChunk('client');
      if (route.chunk) addChunk(route.chunk);
      if (route.chunks) route.chunks.forEach(addChunk);
      data.scripts = Array.from(scripts);
      data.app = {
        apiUrl: process.env.API_URI
      };
      const html = react_dom_server__WEBPACK_IMPORTED_MODULE_8___default.a.renderToStaticMarkup(react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_client_components_Html__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({}, data, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      })));
      res.status(route.status || 200);
      res.send(`<!doctype html>${html}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // ============== /REACT SERVER SIDE RENDERING =============
// ============== GRAPHQL =============


 // Sets the req.user if there is a provided jwt token.

function Authenticate(req, res, next) {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return next(err);

    if (info) {
      if (info == 'TokenExpiredError: jwt expired') {
        // Clear out the users' jwt token.
        res.clearCookie('jwt');
      } else if (info != 'Error: No auth token') {
        return next(info);
      }
    }

    req.user = user || null;
    next();
  })(req, res, next);
}

const formatError = error => {
  const message = error.originalError ? error.originalError.message : 'An unkown error occured';
  const details = error.message || 'An unknown error occurred.';
  const locations = error.locations;
  const path = error.path;
  const extensions = error.extensions;
  const stack = DEVELOPMENT ? error.originalError : `ONLY AVAILABLE IN DEVELOPMENT. CHECK SERVER LOGS. DATE: ${new Date()}`;
  console.error(error.originalError);
  return extensions ? {
    message,
    details,
    stack,
    locations,
    path,
    extensions
  } : {
    message,
    details,
    stack,
    locations,
    path
  };
};

const context = ({
  req,
  res
}) => {
  return __webpack_require__("./app/context.js")({
    req,
    db,
    res,
    fb
  });
};


const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_18__["ApolloServer"]({
  schema: _schema__WEBPACK_IMPORTED_MODULE_20__["default"],
  context: context,
  tracing: true,
  cacheControl: true,
  introspection: true,
  formatError //extensions: [ProfilerExtension]

});
server.applyMiddleware({
  app
});
app.use('/graphql', Authenticate); // app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use('/voyager', Object(graphql_voyager_middleware__WEBPACK_IMPORTED_MODULE_19__["express"])({
  endpointUrl: '/graphql'
})); // ============== /GRAPHQL =============

app.listen({
  port: process.env.PORT
}, () => console.log(`🚀 Server ready at ${process.env.WEB_URI}${server.graphqlPath}`));
/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./app/types/googleId.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQLGoogleId", function() { return GraphQLGoogleId; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("graphql/error");
/* harmony import */ var graphql_error__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_error__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("graphql/language");
/* harmony import */ var graphql_language__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_language__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var graphql_custom_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("graphql-custom-types");
/* harmony import */ var graphql_custom_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_custom_types__WEBPACK_IMPORTED_MODULE_4__);





const factory = new graphql_custom_types__WEBPACK_IMPORTED_MODULE_4__["Factory"]();
const GraphQLGoogleId = factory.getRegexScalar({
  name: 'GoogleId',
  regex: /^\d+$/i,
  description: 'A google profile id.',
  error: 'Query error: Not a valid GoogleId'
});

/***/ }),

/***/ "./chunk-manifest.json":
/***/ (function(module, exports) {

module.exports = require("./chunk-manifest.json");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./app/client/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n", "", {"version":3,"sources":["C:/Projects/hackTheU/app/client/routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,cAAc;EACd,oBAAoB;EACpB,wBAAwB;EACxB,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;EACb,wBAAwB;EACxB,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,UAAU;CACX;;AAED;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,sBAAsB;EACtB,iBAAiB;CAClB","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("@babel/polyfill");
module.exports = __webpack_require__("./app/server.js");


/***/ }),

/***/ "@babel/polyfill":
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "apollo-server-express":
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ "classnames":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "connect-mongo":
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "fb":
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),

/***/ "findorcreate-promise":
/***/ (function(module, exports) {

module.exports = require("findorcreate-promise");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "graphql":
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-compose":
/***/ (function(module, exports) {

module.exports = require("graphql-compose");

/***/ }),

/***/ "graphql-compose-mongoose/node8":
/***/ (function(module, exports) {

module.exports = require("graphql-compose-mongoose/node8");

/***/ }),

/***/ "graphql-custom-types":
/***/ (function(module, exports) {

module.exports = require("graphql-custom-types");

/***/ }),

/***/ "graphql-voyager/middleware":
/***/ (function(module, exports) {

module.exports = require("graphql-voyager/middleware");

/***/ }),

/***/ "graphql/error":
/***/ (function(module, exports) {

module.exports = require("graphql/error");

/***/ }),

/***/ "graphql/language":
/***/ (function(module, exports) {

module.exports = require("graphql/language");

/***/ }),

/***/ "history/createBrowserHistory":
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),

/***/ "isomorphic-style-loader/lib/withStyles":
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-type-email":
/***/ (function(module, exports) {

module.exports = require("mongoose-type-email");

/***/ }),

/***/ "mongoose-type-url":
/***/ (function(module, exports) {

module.exports = require("mongoose-type-url");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "passport":
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-google-oauth20":
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "passport-jwt":
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "universal-router":
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyJDOi9Qcm9qZWN0cy9oYWNrVGhlVS93ZWJwYWNrL2Jvb3RzdHJhcCIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jbGllbnQvY29tcG9uZW50cy9BcHAuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvY2xpZW50L2NvbXBvbmVudHMvSHRtbC5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jbGllbnQvcm91dGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9jbGllbnQvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3M/MzA5MyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jbGllbnQvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jbGllbnQvcm91dGVzL2Vycm9yL2luZGV4LmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL2NsaWVudC9yb3V0ZXMvaW5kZXguanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvY29tcG9zZXJzL2dvb2dsZVVzZXJUQy5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jb21wb3NlcnMvaW5kZXguanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvY29tcG9zZXJzL3NvY2lhbFByb2ZpbGVUQy5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jb21wb3NlcnMvdXNlclRDLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL2NvbnRleHQuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvY3JlYXRlRmV0Y2guanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvbW9kZWxzL2dvb2dsZVVzZXIuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvbW9kZWxzL2luZGV4LmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL21vZGVscy9zb2NpYWxQcm9maWxlLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL21vZGVscy91c2VyLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL29hdXRoLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL29hdXRoL2dvb2dsZS5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9vYXV0aC9vYXV0aC5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9wYXNzcG9ydC5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9zY2hlbWEuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvc2NoZW1hcy9pbmRleC5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9zY2hlbWFzL3NvY2lhbFByb2ZpbGVTY2hlbWEuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvc2NoZW1hcy91c2VyU2NoZW1hLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvYXBwL3NlcnZlci5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC90eXBlcy9nb29nbGVJZC5qcyIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiLi9jaHVuay1tYW5pZmVzdC5qc29uXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9hcHAvY2xpZW50L3JvdXRlcy9lcnJvci9FcnJvclBhZ2UuY3NzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwiQzovUHJvamVjdHMvaGFja1RoZVUvbm9kZV9tb2R1bGVzL2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL2xpYi9pbnNlcnRDc3MuanMiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcIkBiYWJlbC9wb2x5ZmlsbFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImNsYXNzbmFtZXNcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiY29ubmVjdC1tb25nb1wiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJjb29raWUtcGFyc2VyXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImRvdGVudlwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImV4cHJlc3Mtc2Vzc2lvblwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJmYlwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJmaW5kb3JjcmVhdGUtcHJvbWlzZVwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJmc1wiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJncmFwaHFsXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImdyYXBocWwtY29tcG9zZVwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJncmFwaHFsLWNvbXBvc2UtbW9uZ29vc2Uvbm9kZThcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiZ3JhcGhxbC1jdXN0b20tdHlwZXNcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiZ3JhcGhxbC12b3lhZ2VyL21pZGRsZXdhcmVcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiZ3JhcGhxbC9lcnJvclwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJncmFwaHFsL2xhbmd1YWdlXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImhpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3RvcnlcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcImxvZGFzaFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJtb21lbnRcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwibW9uZ29vc2UtdHlwZS1lbWFpbFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJtb25nb29zZS10eXBlLXVybFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwibm9kZS1mZXRjaFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJwYXNzcG9ydC1nb29nbGUtb2F1dGgyMFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJwYXNzcG9ydC1qd3RcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwicGF0aFwiIiwiQzovUHJvamVjdHMvaGFja1RoZVUvZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcInJlYWN0XCIiLCJDOi9Qcm9qZWN0cy9oYWNrVGhlVS9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIiIsIkM6L1Byb2plY3RzL2hhY2tUaGVVL2V4dGVybmFsIFwidW5pdmVyc2FsLXJvdXRlclwiIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJ1cGRhdGVzL1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcInVwZGF0ZXMvXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcbiBcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZSk7XG4gXHR9XG5cbiBcdC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiOTkxNDg3YmJjMWE3MGZmMjExZGNcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzZXJ2ZXJcIjogMFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyByZXF1aXJlKCkgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IDApIHtcbiBcdFx0XHR2YXIgY2h1bmsgPSByZXF1aXJlKFwiLi9jaHVua3MvXCIgKyAoe1widmVuZG9yc35hYm91dH5hZG1pbn5jb250YWN0fmhvbWV+bG9naW5+bm90LWZvdW5kfnByaXZhY3l+cmVnaXN0ZXJcIjpcInZlbmRvcnN+YWJvdXR+YWRtaW5+Y29udGFjdH5ob21lfmxvZ2lufm5vdC1mb3VuZH5wcml2YWN5fnJlZ2lzdGVyXCIsXCJhYm91dH5hZG1pbn5jb250YWN0fmhvbWV+bG9naW5+bm90LWZvdW5kfnByaXZhY3l+cmVnaXN0ZXJcIjpcImFib3V0fmFkbWlufmNvbnRhY3R+aG9tZX5sb2dpbn5ub3QtZm91bmR+cHJpdmFjeX5yZWdpc3RlclwiLFwiYWJvdXRcIjpcImFib3V0XCIsXCJhZG1pblwiOlwiYWRtaW5cIixcImNvbnRhY3RcIjpcImNvbnRhY3RcIixcImhvbWVcIjpcImhvbWVcIixcImxvZ2luXCI6XCJsb2dpblwiLFwibm90LWZvdW5kXCI6XCJub3QtZm91bmRcIixcInByaXZhY3lcIjpcInByaXZhY3lcIixcInJlZ2lzdGVyXCI6XCJyZWdpc3RlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiKTtcbiBcdFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBjaHVuay5tb2R1bGVzLCBjaHVua0lkcyA9IGNodW5rLmlkcztcbiBcdFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzL1wiO1xuXG4gXHQvLyB1bmNhdWdodCBlcnJvciBoYW5kbGVyIGZvciB3ZWJwYWNrIHJ1bnRpbWVcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHtcbiBcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiBcdFx0XHR0aHJvdyBlcnI7IC8vIGNhdGNoIHRoaXMgZXJyb3IgYnkgdXNpbmcgaW1wb3J0KCkuY2F0Y2goKVxuIFx0XHR9KTtcbiBcdH07XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNvbnN0IENvbnRleHRUeXBlID0ge1xuICAvLyBFbmFibGVzIGNyaXRpY2FsIHBhdGggQ1NTIHJlbmRlcmluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20va3JpYXNvZnQvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXJcbiAgaW5zZXJ0Q3NzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAvLyBVbml2ZXJzYWwgSFRUUCBjbGllbnRcbiAgZmV0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHBhdGhuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHF1ZXJ5OiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuLyoqXG4gKiBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCBzZXR0aW5nIGNvbnRleHQgKGdsb2JhbCkgdmFyaWFibGVzXG4gKiB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tIGFsbCB0aGUgY2hpbGQgY29tcG9uZW50cy5cbiAqXG4gKiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NvbnRleHQuaHRtbFxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKlxuICogICBjb25zdCBjb250ZXh0ID0ge1xuICogICAgIGhpc3Rvcnk6IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCksXG4gKiAgICAgc3RvcmU6IGNyZWF0ZVN0b3JlKCksXG4gKiAgIH07XG4gKlxuICogICBSZWFjdERPTS5yZW5kZXIoXG4gKiAgICAgPEFwcCBjb250ZXh0PXtjb250ZXh0fT5cbiAqICAgICAgIDxMYXlvdXQ+XG4gKiAgICAgICAgIDxMYW5kaW5nUGFnZSAvPlxuICogICAgICAgPC9MYXlvdXQ+XG4gKiAgICAgPC9BcHA+LFxuICogICAgIGNvbnRhaW5lcixcbiAqICAgKTtcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29udGV4dDogUHJvcFR5cGVzLnNoYXBlKENvbnRleHRUeXBlKS5pc1JlcXVpcmVkLFxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudC5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IENvbnRleHRUeXBlO1xuXG4gIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIE5PVEU6IElmIHlvdSBuZWVkIHRvIGFkZCBvciBtb2RpZnkgaGVhZGVyLCBmb290ZXIgZXRjLiBvZiB0aGUgYXBwLFxuICAgIC8vIHBsZWFzZSBkbyB0aGF0IGluc2lkZSB0aGUgTGF5b3V0IGNvbXBvbmVudC5cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWRhbmdlciAqL1xuXG5jbGFzcyBIdG1sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGRlc2NyaXB0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc3R5bGVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNzc1RleHQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIH0pLmlzUmVxdWlyZWQsXG4gICAgKSxcbiAgICBzY3JpcHRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQpLFxuICAgIGFwcDogUHJvcFR5cGVzLm9iamVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzdHlsZXM6IFtdLFxuICAgIHNjcmlwdHM6IFtdLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgc3R5bGVzLCBzY3JpcHRzLCBhcHAsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgICAgICA8aGVhZD5cbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIngtdWEtY29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCIgLz5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17ZGVzY3JpcHRpb259IC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAgICB7c2NyaXB0cy5tYXAoc2NyaXB0ID0+IChcbiAgICAgICAgICAgIDxsaW5rIGtleT17c2NyaXB0fSByZWw9XCJwcmVsb2FkXCIgaHJlZj17c2NyaXB0fSBhcz1cInNjcmlwdFwiIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL3NpdGUud2VibWFuaWZlc3RcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiL2ljb24ucG5nXCIgLz5cbiAgICAgICAgICB7c3R5bGVzLm1hcChzdHlsZSA9PiAoXG4gICAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgICAga2V5PXtzdHlsZS5pZH1cbiAgICAgICAgICAgICAgaWQ9e3N0eWxlLmlkfVxuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlLmNzc1RleHQgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvaGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPGRpdiBpZD1cImFwcFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY2hpbGRyZW4gfX0gLz5cbiAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGB3aW5kb3cuQXBwPSR7c2VyaWFsaXplKGFwcCl9YCB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3NjcmlwdHMubWFwKHNjcmlwdCA9PiA8c2NyaXB0IGtleT17c2NyaXB0fSBzcmM9e3NjcmlwdH0gLz4pfVxuICAgICAgICAgIHtwcm9jZXNzLmVudi5HT09HTEVUUkFDS0lOR0lEICYmIChcbiAgICAgICAgICAgIDxzY3JpcHRcbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgICBfX2h0bWw6XG4gICAgICAgICAgICAgICAgICAnd2luZG93LmdhPWZ1bmN0aW9uKCl7Z2EucS5wdXNoKGFyZ3VtZW50cyl9O2dhLnE9W107Z2EubD0rbmV3IERhdGU7JyArXG4gICAgICAgICAgICAgICAgICBgZ2EoJ2NyZWF0ZScsJyR7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkdPT0dMRVRSQUNLSU5HSURcbiAgICAgICAgICAgICAgICAgIH0nLCdhdXRvJyk7Z2EoJ3NlbmQnLCdwYWdldmlldycpYCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7cHJvY2Vzcy5lbnYuR09PR0xFVFJBQ0tJTkdJRCAmJiAoXG4gICAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qc1wiXG4gICAgICAgICAgICAgIGFzeW5jXG4gICAgICAgICAgICAgIGRlZmVyXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvaHRtbD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWw7XG4iLCIvKipcclxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBVbml2ZXJzYWxSb3V0ZXIgZnJvbSAndW5pdmVyc2FsLXJvdXRlcic7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFVuaXZlcnNhbFJvdXRlcihyb3V0ZXMsIHtcclxuICByZXNvbHZlUm91dGUoY29udGV4dCwgcGFyYW1zKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gY29udGV4dC5yb3V0ZVxyXG4gICAgICAgIC5sb2FkKClcclxuICAgICAgICAudGhlbihhY3Rpb24gPT4gYWN0aW9uLmRlZmF1bHQoY29udGV4dCwgcGFyYW1zKSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUuYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiBjb250ZXh0LnJvdXRlLmFjdGlvbihjb250ZXh0LCBwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9LFxyXG59KTtcclxuIiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvaW5zZXJ0Q3NzLmpzXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldENzcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29udGVudC50b1N0cmluZygpOyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcbiAgICBcbiAgICAvLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmdpdGh1Yi5pby9kb2NzL2hvdC1tb2R1bGUtcmVwbGFjZW1lbnRcbiAgICAvLyBPbmx5IGFjdGl2YXRlZCBpbiBicm93c2VyIGNvbnRleHRcbiAgICBpZiAobW9kdWxlLmhvdCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQpIHtcbiAgICAgIHZhciByZW1vdmVDc3MgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTUtcnVsZXMtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUtcnVsZXMtMyEuL0Vycm9yUGFnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL0Vycm9yUGFnZS5jc3MnO1xuXG5jbGFzcyBFcnJvclBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGVycm9yOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgc3RhY2s6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB9KSxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGVycm9yOiBudWxsLFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoX19ERVZfXyAmJiB0aGlzLnByb3BzLmVycm9yKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMT57dGhpcy5wcm9wcy5lcnJvci5uYW1lfTwvaDE+XG4gICAgICAgICAgPHByZT57dGhpcy5wcm9wcy5lcnJvci5zdGFja308L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+RXJyb3I8L2gxPlxuICAgICAgICA8cD5Tb3JyeSwgYSBjcml0aWNhbCBlcnJvciBvY2N1cnJlZCBvbiB0aGlzIHBhZ2UuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgeyBFcnJvclBhZ2UgYXMgRXJyb3JQYWdlV2l0aG91dFN0eWxlIH07XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHMpKEVycm9yUGFnZSk7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJy4vRXJyb3JQYWdlJztcblxuZnVuY3Rpb24gYWN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiAnRGVtbyBFcnJvcicsXG4gICAgY29tcG9uZW50OiA8RXJyb3JQYWdlIC8+LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG5cbi8vIFRoZSB0b3AtbGV2ZWwgKHBhcmVudCkgcm91dGVcbmNvbnN0IHJvdXRlcyA9IHtcbiAgcGF0aDogJycsXG5cbiAgLy8gS2VlcCBpbiBtaW5kLCByb3V0ZXMgYXJlIGV2YWx1YXRlZCBpbiBvcmRlclxuICBjaGlsZHJlbjogW1xuICAgIHtcbiAgICAgIHBhdGg6ICcnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdob21lJyAqLyAnLi9ob21lJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2NvbnRhY3QnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdjb250YWN0JyAqLyAnLi9jb250YWN0JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2xvZ2luJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnbG9naW4nICovICcuL2xvZ2luJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL3JlZ2lzdGVyJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAncmVnaXN0ZXInICovICcuL3JlZ2lzdGVyJyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2Fib3V0JyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnYWJvdXQnICovICcuL2Fib3V0JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL3ByaXZhY3knLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdwcml2YWN5JyAqLyAnLi9wcml2YWN5JyksXG4gICAgfSxcbiAgICB7XG4gICAgICBwYXRoOiAnL2FkbWluJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnYWRtaW4nICovICcuL2FkbWluJyksXG4gICAgfSxcblxuICAgIC8vIFdpbGRjYXJkIHJvdXRlcywgZS5nLiB7IHBhdGg6ICcoLiopJywgLi4uIH0gKG11c3QgZ28gbGFzdClcbiAgICB7XG4gICAgICBwYXRoOiAnKC4qKScsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ25vdC1mb3VuZCcgKi8gJy4vbm90LWZvdW5kJyksXG4gICAgfSxcbiAgXSxcblxuICBhc3luYyBhY3Rpb24oeyBuZXh0IH0pIHtcbiAgICAvLyBFeGVjdXRlIGVhY2ggY2hpbGQgcm91dGUgdW50aWwgb25lIG9mIHRoZW0gcmV0dXJuIHRoZSByZXN1bHRcbiAgICBjb25zdCByb3V0ZSA9IGF3YWl0IG5leHQoKTtcblxuICAgIC8vIFByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHRpdGxlLCBkZXNjcmlwdGlvbiBldGMuXG4gICAgcm91dGUudGl0bGUgPSBgJHtyb3V0ZS50aXRsZSB8fCAnVW50aXRsZWQgUGFnZSd9IC0gd3d3LnJlYWN0c3RhcnRlcmtpdC5jb21gO1xuICAgIHJvdXRlLmRlc2NyaXB0aW9uID0gcm91dGUuZGVzY3JpcHRpb24gfHwgJyc7XG5cbiAgICByZXR1cm4gcm91dGU7XG4gIH0sXG59O1xuXG4vLyBUaGUgZXJyb3IgcGFnZSBpcyBhdmFpbGFibGUgYnkgcGVybWFuZW50IHVybCBmb3IgZGV2ZWxvcG1lbnQgbW9kZVxuaWYgKF9fREVWX18pIHtcbiAgcm91dGVzLmNoaWxkcmVuLnVuc2hpZnQoe1xuICAgIHBhdGg6ICcvZXJyb3InLFxuICAgIGFjdGlvbjogcmVxdWlyZSgnLi9lcnJvcicpLmRlZmF1bHQsXG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCJcclxuaW1wb3J0IHsgY29tcG9zZVdpdGhNb25nb29zZSB9IGZyb20gJ2dyYXBocWwtY29tcG9zZS1tb25nb29zZS9ub2RlOCc7XHJcbmltcG9ydCB7IEdvb2dsZVVzZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5cclxuaW1wb3J0IHsgR3JhcGhRTE5vbk51bGwgfSBmcm9tICdncmFwaHFsJztcclxuaW1wb3J0IHsgR1FDLCBUeXBlQ29tcG9zZXIsIFJlc29sdmVyIH0gZnJvbSAnZ3JhcGhxbC1jb21wb3NlJztcclxuaW1wb3J0IHsgR3JhcGhRTEdvb2dsZUlkIH0gZnJvbSAnLi4vdHlwZXMvZ29vZ2xlSWQnO1xyXG5cclxuY29uc3QgY3VzdG9taXphdGlvbk9wdGlvbnMgPSB7XHJcbiAgbmFtZTogXCJHb29nbGVVc2VyXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiQSBzZWFyY2ggcXVlcnkgdGhhdCBpcyB1c2VmdWwgZm9yIGFuYWx5dGljcy5cIixcclxuXHRyZXNvbHZlcnM6IHtcclxuXHRcdGNyZWF0ZU9uZToge1xyXG5cdFx0XHRyZWNvcmQ6IHtcclxuXHRcdFx0XHRyZXF1aXJlZEZpZWxkczogWydxdWVyeSddLFxyXG5cdFx0XHRcdHJlbW92ZUZpZWxkczogWydjcmVhdGVkQXQnLCAndXBkYXRlZEF0JywgJ19pZCddXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlQnlJZDpcclxuXHRcdHtcclxuXHRcdFx0cmVjb3JkOiB7XHJcblx0XHRcdFx0cmVtb3ZlRmllbGRzOiBbJ2NyZWF0ZWRBdCcsICd1cGRhdGVkQXQnXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEdvb2dsZVVzZXJUQyA9IGNvbXBvc2VXaXRoTW9uZ29vc2UoR29vZ2xlVXNlciwgY3VzdG9taXphdGlvbk9wdGlvbnMpO1xyXG5leHBvcnQgZGVmYXVsdCBHb29nbGVVc2VyVEM7XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09IEZpZWxkcyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbkdvb2dsZVVzZXJUQy5leHRlbmRGaWVsZCgnaWQnLCB7XHJcblx0dHlwZTogR3JhcGhRTEdvb2dsZUlkXHJcbn0pO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT0gUmVsYXRpb25zID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT0gUmVzb2x2ZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuR29vZ2xlVXNlclRDLmdldFJlc29sdmVyKCd1cGRhdGVPbmUnKS5nZXRBcmdUQygnZmlsdGVyJykuZXh0ZW5kRmllbGQoJ2lkJywge1xyXG5cdHR5cGU6IEdyYXBoUUxHb29nbGVJZFxyXG59KTtcclxuXHJcbkdvb2dsZVVzZXJUQy5hZGRSZXNvbHZlcihuZXcgUmVzb2x2ZXIoe1xyXG4gIG5hbWU6ICdmaW5kQnlHb29nbGVJZCcsXHJcblx0ZGVzY3JpcHRpb246ICdGaW5kIGEgZ29vZ2xlIHVzZXIgd2l0aCBhIGdvb2dsZSBpZC4nLFxyXG4gIHR5cGU6IEdvb2dsZVVzZXJUQy5nZXRSZXNvbHZlcignZmluZEJ5SWQnKS5nZXRUeXBlKCksIC8vIG9yIEdyYXBoUUxPdXRwdXRUeXBlXHJcbiAgYXJnczoge1xyXG4gICAgaWQ6IHsgdHlwZTogbmV3IEdyYXBoUUxOb25OdWxsKEdyYXBoUUxHb29nbGVJZCkgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IGFzeW5jICh7IHNvdXJjZSwgYXJncywgY29udGV4dCwgaW5mbyB9KSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgR29vZ2xlVXNlci5maW5kT25lKHtpZDogYXJncy5pZH0pO1xyXG4gIH1cclxufSkpXHJcbiIsImV4cG9ydCB7IFVzZXJUQyB9IGZyb20gJy4vdXNlclRDJztcclxuZXhwb3J0IHsgR29vZ2xlVXNlclRDIH0gZnJvbSAnLi9nb29nbGVVc2VyVEMnO1xyXG5leHBvcnQgeyBTb2NpYWxQcm9maWxlVEMgfSBmcm9tICcuL3NvY2lhbFByb2ZpbGVUQyc7XHJcbiIsImltcG9ydCB7IGNvbXBvc2VXaXRoTW9uZ29vc2UgfSBmcm9tICdncmFwaHFsLWNvbXBvc2UtbW9uZ29vc2Uvbm9kZTgnO1xyXG5pbXBvcnQgeyBTb2NpYWxQcm9maWxlIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgR1FDLCBUeXBlQ29tcG9zZXIsIElucHV0VHlwZUNvbXBvc2VyLCBSZXNvbHZlciB9IGZyb20gJ2dyYXBocWwtY29tcG9zZSc7XHJcbmltcG9ydCB7IEdyYXBoUUxOb25OdWxsIH0gZnJvbSAnZ3JhcGhxbCc7XHJcblxyXG5jb25zdCBjdXN0b21pemF0aW9uT3B0aW9ucyA9IHtcclxuICBkZXNjcmlwdGlvbjogXCJUaGUgbWFpbiB1c2VyXCIsXHJcbiAgcmVzb2x2ZXJzOiB7XHJcbiAgICBjcmVhdGVPbmU6IHtcclxuICAgICAgcmVjb3JkOiB7XHJcbiAgICAgICAgcmVxdWlyZWRGaWVsZHM6IFtdLFxyXG4gICAgICAgIHJlbW92ZUZpZWxkczogWydfaWQnLCAnY3JlYXRlZEF0JywgJ3VwZGF0ZWRBdCddXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IFNvY2lhbFByb2ZpbGVUQyA9IGNvbXBvc2VXaXRoTW9uZ29vc2UoU29jaWFsUHJvZmlsZSwgY3VzdG9taXphdGlvbk9wdGlvbnMpO1xyXG5leHBvcnQgZGVmYXVsdCBTb2NpYWxQcm9maWxlVEM7XHJcblxyXG5Tb2NpYWxQcm9maWxlVEMuYWRkUmVzb2x2ZXIobmV3IFJlc29sdmVyKHtcclxuICBuYW1lOiAnZmFjZWJvb2tFbmdhZ2VtZW50cycsXHJcblx0ZGVzY3JpcHRpb246ICdibGEnLFxyXG4gIHJlc29sdmU6IGFzeW5jICh7IHNvdXJjZSwgYXJncywgY29udGV4dCwgaW5mbyB9KSA9PiB7XHJcbiAgICB2YXIgcmVzID0gYXdhaXQgY29udGV4dC5mYi5hcGkoXCJtZS9mZWVkP2ZpZWxkcz1yZWFjdGlvbnMuc3VtbWFyeSh0cnVlKVwiLCB7IGFjY2Vzc190b2tlbjogcHJvY2Vzcy5lbnYuQUNDRVNTX1RPS0VOIH0pO1xyXG4gICAgY29uc29sZS5sb2cocmVzLmRhdGFbMF0ucmVhY3Rpb25zKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufSkpXHJcbiIsImltcG9ydCB7IGNvbXBvc2VXaXRoTW9uZ29vc2UgfSBmcm9tICdncmFwaHFsLWNvbXBvc2UtbW9uZ29vc2Uvbm9kZTgnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuY29uc3QgY3VzdG9taXphdGlvbk9wdGlvbnMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwiVGhlIG1haW4gdXNlclwiLFxyXG4gIHJlc29sdmVyczoge1xyXG4gICAgY3JlYXRlT25lOiB7XHJcbiAgICAgIHJlY29yZDoge1xyXG4gICAgICAgIHJlcXVpcmVkRmllbGRzOiBbJ3VzZXJuYW1lJ10sXHJcbiAgICAgICAgcmVtb3ZlRmllbGRzOiBbJ19pZCcsICdjcmVhdGVkQXQnLCAndXBkYXRlZEF0J11cclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVXNlclRDID0gY29tcG9zZVdpdGhNb25nb29zZShVc2VyLCBjdXN0b21pemF0aW9uT3B0aW9ucyk7XHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJUQztcclxuIiwiZXhwb3J0IGRlZmF1bHQgKGNvbnRleHQpID0+ICh7XHJcbiAgICBpc0FkbWluOiBjb250ZXh0LnJlcS51c2VyICE9IG51bGwgPyBjb250ZXh0LnJlcS51c2VyLnJvbGVzLmluY2x1ZGVzKFwiYWRtaW5cIikgPT0gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgdXNlcjogY29udGV4dC5yZXEudXNlcixcclxuICAgIGlwQWRkcmVzczogY29udGV4dC5yZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ10gfHwgY29udGV4dC5yZXEuY29ubmVjdGlvbi5yZW1vdGVBZGRyZXNzLFxyXG4gICAgLi4uY29udGV4dFxyXG59KTtcclxuIiwiLyoqXHJcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcclxuICpcclxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICovXHJcblxyXG4vKiBAZmxvdyAqL1xyXG5cclxuaW1wb3J0IHR5cGUgeyBncmFwaHFsIGFzIGdyYXBocVR5cGUsIEdyYXBoUUxTY2hlbWEgfSBmcm9tICdncmFwaHFsJztcclxuXHJcbnR5cGUgRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM6ID9hbnkpID0+IFByb21pc2U8YW55PjtcclxuXHJcbnR5cGUgT3B0aW9ucyA9IHtcclxuICBiYXNlVXJsOiBzdHJpbmcsXHJcbiAgY29va2llPzogc3RyaW5nLFxyXG4gIHNjaGVtYT86IEdyYXBoUUxTY2hlbWEsXHJcbiAgZ3JhcGhxbD86IGdyYXBocVR5cGUsXHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gYXJvdW5kIHRoZSBIVE1MNSBGZXRjaCBBUEkgdGhhdCBwcm92aWRlc1xyXG4gKiBkZWZhdWx0IGFyZ3VtZW50cyB0byBmZXRjaCguLi4pIGFuZCBpcyBpbnRlbmRlZCB0byByZWR1Y2UgdGhlIGFtb3VudFxyXG4gKiBvZiBib2lsZXJwbGF0ZSBjb2RlIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQVBJL0ZldGNoX0FQSS9Vc2luZ19GZXRjaFxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlRmV0Y2goXHJcbiAgZmV0Y2g6IEZldGNoLFxyXG4gIHsgYmFzZVVybCwgY29va2llLCBzY2hlbWEsIGdyYXBocWwgfTogT3B0aW9ucyxcclxuKSB7XHJcbiAgLy8gTk9URTogVHdlYWsgdGhlIGRlZmF1bHQgb3B0aW9ucyB0byBzdWl0ZSB5b3VyIGFwcGxpY2F0aW9uIG5lZWRzXHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJywgLy8gaGFuZHkgd2l0aCBHcmFwaFFMIGJhY2tlbmRzXHJcbiAgICBtb2RlOiBiYXNlVXJsID8gJ2NvcnMnIDogJ3NhbWUtb3JpZ2luJyxcclxuICAgIGNyZWRlbnRpYWxzOiBiYXNlVXJsID8gJ2luY2x1ZGUnIDogJ3NhbWUtb3JpZ2luJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgIC4uLihjb29raWUgPyB7IENvb2tpZTogY29va2llIH0gOiBudWxsKSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGFzeW5jICh1cmw6IHN0cmluZywgb3B0aW9uczogYW55KSA9PiB7XHJcbiAgICBjb25zdCBpc0dyYXBoUUwgPSB1cmwuc3RhcnRzV2l0aCgnL2dyYXBocWwnKTtcclxuICAgIGlmIChzY2hlbWEgJiYgZ3JhcGhxbCAmJiBpc0dyYXBoUUwpIHtcclxuICAgICAgLy8gV2UncmUgU1NSLCBzbyByb3V0ZSB0aGUgZ3JhcGhxbCBpbnRlcm5hbCB0byBhdm9pZCBsYXRlbmN5XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gSlNPTi5wYXJzZShvcHRpb25zLmJvZHkpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBncmFwaHFsKFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBxdWVyeS5xdWVyeSxcclxuICAgICAgICB7IHJlcXVlc3Q6IHt9IH0sIC8vIGZpbGwgaW4gcmVxdWVzdCB2YXJzIG5lZWRlZCBieSBncmFwaHFsXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICBxdWVyeS52YXJpYWJsZXMsXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgICAgIHN0YXR1czogcmVzdWx0LmVycm9ycyA/IDQwMCA6IDIwMCxcclxuICAgICAgICBqc29uOiAoKSA9PiBQcm9taXNlLnJlc29sdmUocmVzdWx0KSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlzR3JhcGhRTCB8fCB1cmwuc3RhcnRzV2l0aCgnL2FwaScpXHJcbiAgICAgID8gZmV0Y2goYCR7YmFzZVVybH0ke3VybH1gLCB7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0cyxcclxuICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIC4uLmRlZmF1bHRzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgIC4uLihvcHRpb25zICYmIG9wdGlvbnMuaGVhZGVycyksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgIDogZmV0Y2godXJsLCBvcHRpb25zKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGZXRjaDtcclxuIiwiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IGZpbmRPckNyZWF0ZSBmcm9tICdmaW5kb3JjcmVhdGUtcHJvbWlzZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxudmFyIEdvb2dsZVVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG57XHJcblx0aWQ6XHJcblx0e1xyXG5cdFx0dHlwZTogU3RyaW5nLFxyXG5cdFx0cmVxdWlyZWQ6IHRydWUsXHJcblx0XHRpbmRleDogdHJ1ZSxcclxuXHRcdHVuaXF1ZTogdHJ1ZSxcclxuXHRcdGRlc2NyaXB0aW9uOiBcIlRoZSBnb29nbGUgaWQgb2YgdGhlIHVzZXIuXCJcclxuXHR9LFxyXG5cdGVtYWlsczpcclxuXHR7XHJcblx0XHR0eXBlOiBbbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICAgIGVtYWlsOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGluZGV4OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmdcclxuICAgICAgfVxyXG4gICAgfSldLFxyXG5cdFx0aW5kZXg6IHRydWUsXHJcblx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdH0sXHJcblx0ZGlzcGxheU5hbWU6XHJcbiAge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgZGVzY3JpcHRpb246ICdUaGUgZGlzcGxheSBuYW1lIG9uIEdvb2dsZSBmb3IgdGhlIHVzZXIuJ1xyXG4gIH0sXHJcblx0aW1hZ2U6IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG5cdFx0dXJsOiB7XHJcblx0XHRcdHR5cGU6IFN0cmluZ1xyXG5cdFx0fSxcclxuXHRcdGlzRGVmYXVsdDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuXHJcblx0XHR9XHJcblx0fSksXHJcblx0YWJvdXRNZTpcclxuXHR7XHJcblx0XHR0eXBlOiBTdHJpbmcsXHJcblx0XHRkZXNjcmlwdGlvbjogJ0Egc2hvcnQgYmlvZ3JhcGh5IGZvciB0aGlzIHBlcnNvbi4nXHJcblx0fSxcclxuXHRnZW5kZXI6XHJcblx0e1xyXG5cdFx0dHlwZTogU3RyaW5nLFxyXG5cdFx0aW5kZXg6IHRydWUsXHJcblx0XHRkZXNjcmlwdGlvbjogJ1RoZSBwZXJzb25cXCdzIGdlbmRlci4nXHJcblx0fSxcclxuXHRpc1BsdXNVc2VyOlxyXG5cdHtcclxuXHRcdHR5cGU6IEJvb2xlYW4sXHJcblx0XHRkZXNjcmlwdGlvbjogJ1doZXRoZXIgdGhlIHVzZXIgaXMgYSBHb29nbGUgUGx1cyB1c2VyLidcclxuXHR9LFxyXG5cdHVybDpcclxuXHR7XHJcblx0XHR0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuVXJsLFxyXG5cdFx0ZGVzY3JpcHRpb246ICdUaGUgVVJMIG9mIHRoaXMgcGVyc29uXFwncyBwcm9maWxlLidcclxuXHR9LFxyXG5cdGxhbmd1YWdlOlxyXG5cdHtcclxuXHRcdHR5cGU6IFN0cmluZyxcclxuXHRcdGRlc2NyaXB0aW9uOiAnVGhlIHVzZXJcXCdzIGxhbmd1YWdlLicsXHJcblx0XHRpbmRleDogdHJ1ZVxyXG5cdH0sXHJcblx0dmVyaWZpZWQ6XHJcblx0e1xyXG5cdFx0dHlwZTogQm9vbGVhbixcclxuXHRcdGRlc2NyaXB0aW9uOiAnV2hldGhlciB0aGUgcGVyc29uIG9yIEdvb2dsZSsgUGFnZSBoYXMgYmVlbiB2ZXJpZmllZC4nXHJcblx0fVxyXG59LFxyXG57XHJcbiAgdGltZXN0YW1wczogdHJ1ZVxyXG59KTtcclxuR29vZ2xlVXNlclNjaGVtYS5wbHVnaW4oZmluZE9yQ3JlYXRlKTtcclxuXHJcbkdvb2dsZVVzZXJTY2hlbWEuaW5kZXgoe1wiY3JlYXRlZEF0XCI6IDF9KTtcclxuXHJcbkdvb2dsZVVzZXJTY2hlbWEucHJlKCdzYXZlJywgYXN5bmMgZnVuY3Rpb24obmV4dCkge1xyXG4gIGlmKCF0aGlzLmlzTmV3KSByZXR1cm4gbmV4dCgpO1xyXG4gIHJldHVybiBuZXh0KCk7XHJcbn0pO1xyXG5cclxuR29vZ2xlVXNlclNjaGVtYS5wcmUoJ3JlbW92ZScsIGFzeW5jIGZ1bmN0aW9uKG5leHQpIHtcclxuICByZXR1cm4gbmV4dCgpO1xyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBHb29nbGVVc2VyID0gbW9uZ29vc2UubW9kZWwoJ0dvb2dsZVVzZXInLCBHb29nbGVVc2VyU2NoZW1hKTtcclxuIiwiZXhwb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XHJcbmV4cG9ydCB7IEdvb2dsZVVzZXIgfSBmcm9tICcuL2dvb2dsZVVzZXInO1xyXG5leHBvcnQgeyBTb2NpYWxQcm9maWxlIH0gZnJvbSAnLi9zb2NpYWxQcm9maWxlJztcclxuIiwiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5cclxuY29uc3QgVHlwZXMgPSBtb25nb29zZS5TY2hlbWEuVHlwZXM7XHJcbmNvbnN0IFNvY2lhbFByb2ZpbGVTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICBpbnRlcmFjdGlvbnM6IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB0b3RhbCBudW1iZXIgb2YgaW50ZXJhY3Rpb25zIHdpdGggYSB1c2VycycgcG9zdHMuXCIsXHJcbiAgICBpbmRleDogdHJ1ZVxyXG4gIH0sXHJcbn0sIHsgdGltZXN0YW1wczogdHJ1ZSB9KTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgU29jaWFsUHJvZmlsZSA9IG1vbmdvb3NlLm1vZGVsKCdTb2NpYWxQcm9maWxlJywgU29jaWFsUHJvZmlsZVNjaGVtYSk7XHJcbmV4cG9ydCBkZWZhdWx0IFNvY2lhbFByb2ZpbGU7XHJcbiIsImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuXHJcbmNvbnN0IFR5cGVzID0gbW9uZ29vc2UuU2NoZW1hLlR5cGVzO1xyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgdXNlcm5hbWU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGhlIG5hbWUgdGhhdCBpcyBwdWJsaWNhbGx5IGRpc3BsYXllZFwiLFxyXG4gICAgaW5kZXg6IHRydWVcclxuICB9LFxyXG4gIGdvb2dsZUlkOiB7XHJcbiAgICB0eXBlOiBUeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogJ0dvb2dsZVVzZXInLFxyXG4gICAgZGVzY3JpcHRpb246ICdUaGUgaWQgb2YgdGhlIGdvb2dsZSB1c2VyIGluIHRoZSBkYXRhYmFzZS4nLFxyXG4gICAgaW5kZXg6IHRydWVcclxuICB9LFxyXG4gIHNvY2lhbElkczoge1xyXG4gICAgdHlwZTogW3tcclxuICAgICAgdHlwZTogVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ0dvb2dsZVVzZXInLFxyXG4gICAgfV0sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBpZHMgb2YgYSB1c2VycyBzb2NpYWwgcHJvZmlsZXMuJyxcclxuICB9XHJcbn0sIHsgdGltZXN0YW1wczogdHJ1ZSB9KTtcclxuXHJcblVzZXJTY2hlbWEucHJlKCdzYXZlJywgYXN5bmMgZnVuY3Rpb24obmV4dClcclxue1xyXG4gIHJldHVybiBuZXh0KCk7XHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgVXNlciA9IG1vbmdvb3NlLm1vZGVsKCdVc2VyJywgVXNlclNjaGVtYSk7XHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbiIsImltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCc7XHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL3VzZXInO1xyXG5cclxuY29uc3QgU2F2ZVJlZGlyZWN0ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgcmVxLnNlc3Npb24ucmVkaXJlY3QgPSB7XHJcbiAgICBwYXNzOiByZXEucXVlcnkucGFzcyxcclxuICAgIGZhaWw6IHJlcS5xdWVyeS5mYWlsXHJcbiAgfTtcclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmNvbnN0IEhhbmRsZVJlZGlyZWN0ID0gKHtyZXEsIHJlcywgcGFzc30pID0+IHtcclxuICBpZiAocGFzcyAmJiByZXEuc2Vzc2lvbi5yZWRpcmVjdCAmJiByZXEuc2Vzc2lvbi5yZWRpcmVjdC5wYXNzKVxyXG4gIHtcclxuICAgIGNvbnN0IHJlZGlyZWN0ID0gcmVxLnNlc3Npb24ucmVkaXJlY3Q7XHJcbiAgICBkZWxldGUocmVxLnNlc3Npb24ucmVkaXJlY3QpO1xyXG4gICAgcmVzLnJlZGlyZWN0KHJlZGlyZWN0LnBhc3MpO1xyXG4gIH1cclxuICBlbHNlIGlmICghcGFzcyAmJiByZXEuc2Vzc2lvbi5yZWRpcmVjdCAmJiByZXEuc2Vzc2lvbi5yZWRpcmVjdC5mYWlsKVxyXG4gIHtcclxuICAgIGNvbnN0IHJlZGlyZWN0ID0gcmVxLnNlc3Npb24ucmVkaXJlY3Q7XHJcbiAgICBkZWxldGUocmVxLnNlc3Npb24ucmVkaXJlY3QpO1xyXG4gICAgcmVzLnJlZGlyZWN0KHJlZGlyZWN0LmZhaWwpO1xyXG4gIH1cclxuICBlbHNlXHJcbiAge1xyXG4gICAgaWYgKHJlcS5zZXNzaW9uLnJlZGlyZWN0KVxyXG4gICAge1xyXG4gICAgICBkZWxldGUocmVxLnNlc3Npb24ucmVkaXJlY3QpO1xyXG4gICAgfVxyXG4gICAgcmVzLnJlZGlyZWN0KGAke3Byb2Nlc3MuZW52LldFQl9VUkl9JHtERVZFTE9QTUVOVCA/ICcvZ3JhcGhpcWwnIDogJy8nfWApO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgR2VuZXJhdGVKd3QgPSAocmVxLCByZXMpID0+IHtcclxuICBjb25zdCB1c2VyID0gcmVxLnNlc3Npb24ucGFzc3BvcnQudXNlcjtcclxuICAvLyBnZW5lcmF0ZSBsb2dpbiB0b2tlblxyXG4gIGNvbnN0IHRva2VuUGF5bG9hZCA9IHtcclxuICAgIHVzZXI6IHVzZXIuX2lkLFxyXG4gICAgZXhwOiBtb21lbnQoKS5hZGQoMzAsICdkYXlzJykudW5peCgpXHJcbiAgfTtcclxuICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKHRva2VuUGF5bG9hZCwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCk7XHJcbiAgbGV0IG9wdHMgPSAhREVWRUxPUE1FTlQgPyB7XHJcbiAgIHNlY3VyZTogdHJ1ZSxcclxuICAgZG9tYWluOiBwcm9jZXNzLmVudi5KV1RfRE9NQUlOXHJcbiAgfSA6IHt9O1xyXG4gIC8vIEluY3JlbWVudCBzaWduSW5Db3VudCBhbmQgc2F2ZSBsYXN0SXBcclxuICBjb25zdCBpcEFkZHJlc3MgPSByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ10gfHwgcmVxLmNvbm5lY3Rpb24ucmVtb3RlQWRkcmVzcztcclxuICBVc2VyLnVwZGF0ZSh7X2lkOiB1c2VyLl9pZH0sIHsgJHNldDogeyBsYXN0SXA6IGlwQWRkcmVzcyB9LCAkaW5jOiB7IHNpZ25JbkNvdW50OiAxIH0gfSkuZXhlYygpO1xyXG5cclxuICAvLyBTZW5kIHRoZSBqd3QgY29va2llIHRvIHRoZSBjbGllbnQuXHJcbiAgcmVzLmNvb2tpZSgnand0JywgdG9rZW4sIG9wdHMpO1xyXG59XHJcblxyXG4gZXhwb3J0IGNvbnN0IE9BdXRoID0gKGFwcCkgPT4ge1xyXG4gIGFwcC5nZXQoJy9hdXRoL3ZlcmlmeScsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgYXdhaXQgVXNlci51cGRhdGUoeyBcImVtYWlsVmVyaWZpY2F0aW9uLmhhc2hcIjogcmVxLnF1ZXJ5LmlkIH0sIHsgJHNldDogeyB2ZXJpZmllZDogdHJ1ZSwgZW1haWxWZXJpZmljYXRpb246IG51bGwgfSB9KTtcclxuICAgIHJlcy5yZWRpcmVjdChyZXEucXVlcnkucmVkaXJlY3QgfHwgcHJvY2Vzcy5lbnYuV0VCX1VSSSk7XHJcbiAgfSk7XHJcblxyXG4gIGFwcC5nZXQoJy9hdXRoL2ZhaWwnLCAocmVxLCByZXMpID0+IHtcclxuICAgIEhhbmRsZVJlZGlyZWN0KHtyZXEsIHJlcywgcGFzczogZmFsc2V9KTtcclxuICB9KTtcclxuXHJcbiAgYXBwLmdldChcclxuICAgICcvYXV0aC9nb29nbGUnLFxyXG4gICAgU2F2ZVJlZGlyZWN0LFxyXG4gICAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdnb29nbGUnLCB7IHNjb3BlOiBbICdlbWFpbCcsICdwcm9maWxlJyBdfSlcclxuICApO1xyXG5cclxuICBhcHAuZ2V0KFxyXG4gICAgJy9hdXRoL2dvb2dsZS9jYWxsYmFjaycsXHJcbiAgICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2dvb2dsZScsIHsgZmFpbHVyZVJlZGlyZWN0OiAnL2F1dGgvZmFpbCcgfSksXHJcbiAgICAocmVxLCByZXMpID0+IHtcclxuICAgICAgR2VuZXJhdGVKd3QocmVxLCByZXMpO1xyXG4gICAgICBIYW5kbGVSZWRpcmVjdCh7cmVxLCByZXMsIHBhc3M6IHRydWV9KTtcclxuICAgIH1cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPQXV0aDtcclxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IFN0cmF0ZWd5IGFzIEdvb2dsZVN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtZ29vZ2xlLW9hdXRoMjAnO1xyXG5pbXBvcnQgeyBHZXRVc2VyIH0gZnJvbSAnLi9vYXV0aCc7XHJcblxyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXInO1xyXG5pbXBvcnQgeyBHb29nbGVVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL2dvb2dsZVVzZXInO1xyXG5cclxuY29uc3QgZXh0cmFjdFByb2ZpbGUgPSBwcm9maWxlID0+IHtcclxuICBsZXQgaW1hZ2VVcmwgPSAnJztcclxuICBpZiAocHJvZmlsZS5waG90b3MgJiYgcHJvZmlsZS5waG90b3MubGVuZ3RoKSB7XHJcbiAgICBpbWFnZVVybCA9IHByb2ZpbGUucGhvdG9zWzBdLnZhbHVlO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgaWQ6IHByb2ZpbGUuaWQsXHJcbiAgICBkaXNwbGF5TmFtZTogcHJvZmlsZS5kaXNwbGF5TmFtZSxcclxuICAgIGltYWdlOiBpbWFnZVVybFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnb29nbGVTdHJhdGVneSA9IG5ldyBHb29nbGVTdHJhdGVneSh7XHJcbiAgICBjbGllbnRJRDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCxcclxuICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsXHJcbiAgICBjYWxsYmFja1VSTDpgJHtwcm9jZXNzLmVudi5XRUJfVVJJfS9hdXRoL2dvb2dsZS9jYWxsYmFja2AsXHJcbiAgICBwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZVxyXG4gIH0sIGFzeW5jIChyZXEsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIHByb2ZpbGUsIGRvbmUpID0+IHtcclxuICAgIHRyeVxyXG4gICAge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgSGFuZGxlcih7cmVxLCBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlfSk7XHJcbiAgICAgIGlmICh1c2VyKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmVxLmluZm8gPSB7fTsgLy8gQWRkIHRoaXMgc28gaXQgbG9ncyB0byBhbmFseXRpY3MuXHJcbiAgICAgICAgTG9nQWN0aW9uKHJlcSwgJ3VzZXJTaWduSW5Hb29nbGUnLCB7XHJcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuX2lkXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9uZShudWxsLCB1c2VyKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRmFpbGVkIHRvIGdldCB1c2VyIGZvcjogJHtwcm9maWxlLmlkfWApO1xyXG4gICAgICAgIGRvbmUobnVsbCwgbnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoKGVycilcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgaWYgKERFVkVMT1BNRU5UKSBkb25lKGVyciwgbnVsbCwgeyBtZXNzYWdlOiBlcnIgfSk7XHJcbiAgICAgIGVsc2UgZG9uZShudWxsLCBudWxsKTtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG5jb25zdCBIYW5kbGVyID0gYXN5bmMgKHtyZXEsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIHByb2ZpbGV9KSA9PiB7XHJcbiAgbGV0IHVzZXIgPSBhd2FpdCBHZXRVc2VyKHtcclxuICAgIHJlcSxcclxuICAgIHZlcmlmaWVkOiB0cnVlLFxyXG4gICAgZW1haWw6IHByb2ZpbGUuZW1haWxzWzBdLnZhbHVlLFxyXG4gICAgdXNlcm5hbWU6IHByb2ZpbGUuaWRcclxuICB9KTtcclxuICBsZXQgZ3UgPSBhd2FpdCBDcmVhdGVHb29nbGVVc2VyKHByb2ZpbGUpO1xyXG5cclxuICBhd2FpdCBVc2VyLnVwZGF0ZSh7X2lkOiB1c2VyLl9pZH0sIHsgJHNldDogeyBnb29nbGVJZDogZ3UuX2lkIH0sICRpbmM6IHsgc2lnbkluQ291bnQ6IDEgfSB9KTtcclxuICByZXR1cm4gdXNlcjtcclxufVxyXG5cclxuY29uc3QgQ3JlYXRlR29vZ2xlVXNlciA9IGFzeW5jIChwcm9maWxlKSA9PiB7XHJcbiAgbGV0IHZhbHVlcyA9IF8ucGljayhwcm9maWxlLCBbJ2lkJywgJ2VtYWlscycsICdnZW5kZXInLCAnZGlzcGxheU5hbWUnXSk7XHJcbiAgdmFsdWVzID0gXy5tZXJnZSh2YWx1ZXMsIF8ucGljayhwcm9maWxlLl9qc29uLCBbJ2xhbmd1YWdlJywgJ2Fib3V0TWUnLCAndXJsJywgJ2ltYWdlJywgJ2lzUGx1c1VzZXInLCAndmVyaWZpZWQnXSkpO1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IEdvb2dsZVVzZXIuZmluZE9yQ3JlYXRlKHsgaWQ6IHByb2ZpbGUuaWQgfSwgdmFsdWVzLCB7dXBzZXJ0OiB0cnVlfSk7XHJcbiAgaWYgKHJlcy5lcnJvcnMpIGNvbnNvbGUubG9nKHJlcy5lcnJvcnMpO1xyXG4gIHJldHVybiByZXMucmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnb29nbGVTdHJhdGVneTtcclxuIiwiaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBHZXRVc2VyID0gYXN5bmMgKHtyZXEsIGVtYWlsLCB1c2VybmFtZSwgdmVyaWZpZWQgPSB0cnVlfSkgPT4ge1xyXG4gIGxldCB1c2VyO1xyXG4gIGlmIChyZXEuc2Vzc2lvbiAmJiByZXEuc2Vzc2lvbi5wYXNzcG9ydCAmJiByZXEuc2Vzc2lvbi5wYXNzcG9ydC51c2VyKVxyXG4gIHtcclxuICAgIC8vIFVzZSB0aGUgYWxyZWFkeSBsb2dnZWQgaW4gdXNlci5cclxuICAgIHVzZXIgPSByZXEuc2Vzc2lvbi5wYXNzcG9ydC51c2VyO1xyXG4gIH1cclxuICBlbHNlXHJcbiAge1xyXG4gICAgLy8gRmluZCBvciBjcmVhdGUgYSB1c2VyIGZvciB0aGUgZGlzY29yZCBlbWFpbC5cclxuICAgIGlmICghdmVyaWZpZWQpIHRocm93IG5ldyBFcnJvcignRW1haWwgbm90IHZlcmlmaWVkIHdpdGggYXV0aCBwcm92aWRlci4nKTtcclxuICAgIGxldCByZXMgPSBhd2FpdCBVc2VyLmZpbmRPckNyZWF0ZSh7IGVtYWlsOiBlbWFpbCB9LCB7IGVtYWlsOiBlbWFpbCwgdXNlcm5hbWU6IHVzZXJuYW1lLCB1c2VybmFtZV91bmlxdWU6IHVzZXJuYW1lIH0pO1xyXG4gICAgaWYgKHJlcy5lcnJvcnMpIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShyZXMuZXJyb3JzKSk7XHJcbiAgICB1c2VyID0gcmVzLnJlc3VsdDtcclxuICB9XHJcbiAgcmV0dXJuIHVzZXI7XHJcbn1cclxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJ3Bhc3Nwb3J0JztcclxuXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL21vZGVscy91c2VyJztcclxuXHJcbmltcG9ydCB7IFN0cmF0ZWd5IGFzIEp3dFN0cmF0ZWd5LCBFeHRyYWN0Snd0IH0gZnJvbSAncGFzc3BvcnQtand0JztcclxuaW1wb3J0IEdvb2dsZVN0cmF0ZWd5IGZyb20gJy4vb2F1dGgvZ29vZ2xlJztcclxuXHJcbnBhc3Nwb3J0LnVzZShHb29nbGVTdHJhdGVneSk7XHJcblxyXG5jb25zdCBjb29raWVFeHRyYWN0b3IgPSByZXEgPT4ge1xyXG4gIHJldHVybiAocmVxICYmIHJlcS5jb29raWVzKSA/IHJlcS5jb29raWVzLmp3dCA6IG51bGw7XHJcbn07XHJcblxyXG5sZXQgb3B0cyA9IHtcclxuICBqd3RGcm9tUmVxdWVzdDogRXh0cmFjdEp3dC5mcm9tRXh0cmFjdG9ycyhbXHJcbiAgICBFeHRyYWN0Snd0LmZyb21BdXRoSGVhZGVyQXNCZWFyZXJUb2tlbigpLFxyXG4gICAgY29va2llRXh0cmFjdG9yXHJcbiAgXSksXHJcbiAgc2VjcmV0T3JLZXk6IHByb2Nlc3MuZW52LkpXVF9TRUNSRVRcclxufVxyXG5cclxucGFzc3BvcnQudXNlKG5ldyBKd3RTdHJhdGVneShvcHRzLCAoand0X3BheWxvYWQsIGRvbmUpID0+XHJcbntcclxuICBpZiAoIWp3dF9wYXlsb2FkLnVzZXIpIGNvbnNvbGUud2FybihgVXNlciBub3QgZm91bmQgaW4gand0IHBheWxvYWQuYCk7XHJcbiAgVXNlci5maW5kQnlJZChqd3RfcGF5bG9hZC51c2VyLCAoZXJyLCB1c2VyKSA9PiB7XHJcbiAgICByZXR1cm4gZG9uZShlcnIsIHVzZXIpO1xyXG4gIH0pO1xyXG59KSk7XHJcblxyXG5wYXNzcG9ydC5zZXJpYWxpemVVc2VyKGZ1bmN0aW9uKHVzZXIsIGRvbmUpIHtcclxuICBkb25lKG51bGwsIHVzZXIpO1xyXG59KTtcclxuXHJcbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihmdW5jdGlvbih1c2VyLCBkb25lKSB7XHJcbiAgZG9uZShudWxsLCB1c2VyKTtcclxufSk7XHJcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IGNvbXBvc2VXaXRoTW9uZ29vc2UgfSBmcm9tICdncmFwaHFsLWNvbXBvc2UtbW9uZ29vc2Uvbm9kZTgnO1xyXG5pbXBvcnQgeyBzY2hlbWFDb21wb3NlciB9IGZyb20gJ2dyYXBocWwtY29tcG9zZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIFVzZXJRdWVyaWVzLFxyXG4gIFVzZXJNdXRhdGlvbnMsXHJcbiAgU29jaWFsUHJvZmlsZVF1ZXJpZXMsXHJcbiAgU29jaWFsUHJvZmlsZU11dGF0aW9uc1xyXG59IGZyb20gJy4vc2NoZW1hcyc7XHJcblxyXG5zY2hlbWFDb21wb3Nlci5RdWVyeS5hZGRGaWVsZHMoe1xyXG4gIC4uLlVzZXJRdWVyaWVzLFxyXG4gIC4uLlNvY2lhbFByb2ZpbGVRdWVyaWVzLFxyXG59KTtcclxuXHJcbnNjaGVtYUNvbXBvc2VyLk11dGF0aW9uLmFkZEZpZWxkcyh7XHJcbiAgLi4uVXNlck11dGF0aW9ucyxcclxuICAuLi5Tb2NpYWxQcm9maWxlTXV0YXRpb25zLFxyXG59KTtcclxuXHJcbmNvbnN0IGdyYXBocWxTY2hlbWEgPSBzY2hlbWFDb21wb3Nlci5idWlsZFNjaGVtYSgpO1xyXG5leHBvcnQgZGVmYXVsdCBncmFwaHFsU2NoZW1hO1xyXG4iLCJleHBvcnQgeyBVc2VyUXVlcmllcywgVXNlck11dGF0aW9ucyB9IGZyb20gJy4vdXNlclNjaGVtYSc7XHJcbmV4cG9ydCB7IFNvY2lhbFByb2ZpbGVRdWVyaWVzLCBTb2NpYWxQcm9maWxlTXV0YXRpb25zIH0gZnJvbSAnLi9zb2NpYWxQcm9maWxlU2NoZW1hJztcclxuIiwiaW1wb3J0IHsgU29jaWFsUHJvZmlsZVRDIH0gZnJvbSAnLi4vY29tcG9zZXJzJztcclxuXHJcbmV4cG9ydCBjb25zdCBTb2NpYWxQcm9maWxlUXVlcmllcyA9IHtcclxuICBzb2NpYWxQcm9maWxlQnlJZDogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdmaW5kQnlJZCcpLFxyXG4gIHNvY2lhbFByb2ZpbGVCeUlkczogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdmaW5kQnlJZHMnKSxcclxuICBzb2NpYWxQcm9maWxlT25lOiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ2ZpbmRPbmUnKSxcclxuICBzb2NpYWxQcm9maWxlTWFueTogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdmaW5kTWFueScpLFxyXG4gIHNvY2lhbFByb2ZpbGVDb3VudDogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdjb3VudCcpLFxyXG4gIHNvY2lhbFByb2ZpbGVDb25uZWN0aW9uOiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ2Nvbm5lY3Rpb24nKSxcclxuICBzb2NpYWxQcm9maWxlUGFnaW5hdGlvbjogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdwYWdpbmF0aW9uJyksXHJcbiAgc29jaWFsRW5nYWdlbWVudENvdW50OiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ2ZhY2Vib29rRW5nYWdlbWVudHMnKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU29jaWFsUHJvZmlsZU11dGF0aW9ucyA9IHtcclxuICBzb2NpYWxQcm9maWxlQ3JlYXRlOiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ2NyZWF0ZU9uZScpLFxyXG4gIC8vIHNvY2lhbFByb2ZpbGVVcGRhdGVCeUlkOiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ3VwZGF0ZUJ5SWQnKSxcclxuICAvLyBzb2NpYWxQcm9maWxlVXBkYXRlT25lOiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ3VwZGF0ZU9uZScpLFxyXG4gIC8vIHNvY2lhbFByb2ZpbGVVcGRhdGVNYW55OiBTb2NpYWxQcm9maWxlVEMuZ2V0UmVzb2x2ZXIoJ3VwZGF0ZU1hbnknKSxcclxuICAvLyBzb2NpYWxQcm9maWxlUmVtb3ZlQnlJZDogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdyZW1vdmVCeUlkJyksXHJcbiAgLy8gc29jaWFsUHJvZmlsZVJlbW92ZU9uZTogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdyZW1vdmVPbmUnKSxcclxuICAvLyBzb2NpYWxQcm9maWxlUmVtb3ZlTWFueTogU29jaWFsUHJvZmlsZVRDLmdldFJlc29sdmVyKCdyZW1vdmVNYW55JyksXHJcbn1cclxuIiwiaW1wb3J0IHsgVXNlclRDIH0gZnJvbSAnLi4vY29tcG9zZXJzJztcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyUXVlcmllcyA9IHtcclxuICB1c2VyQnlJZDogVXNlclRDLmdldFJlc29sdmVyKCdmaW5kQnlJZCcpLFxyXG4gIHVzZXJCeUlkczogVXNlclRDLmdldFJlc29sdmVyKCdmaW5kQnlJZHMnKSxcclxuICB1c2VyT25lOiBVc2VyVEMuZ2V0UmVzb2x2ZXIoJ2ZpbmRPbmUnKSxcclxuICB1c2VyTWFueTogVXNlclRDLmdldFJlc29sdmVyKCdmaW5kTWFueScpLFxyXG4gIHVzZXJDb3VudDogVXNlclRDLmdldFJlc29sdmVyKCdjb3VudCcpLFxyXG4gIHVzZXJDb25uZWN0aW9uOiBVc2VyVEMuZ2V0UmVzb2x2ZXIoJ2Nvbm5lY3Rpb24nKSxcclxuICB1c2VyUGFnaW5hdGlvbjogVXNlclRDLmdldFJlc29sdmVyKCdwYWdpbmF0aW9uJyksXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyTXV0YXRpb25zID0ge1xyXG4gIHVzZXJDcmVhdGU6IFVzZXJUQy5nZXRSZXNvbHZlcignY3JlYXRlT25lJyksXHJcbiAgLy8gdXNlclVwZGF0ZUJ5SWQ6IFVzZXJUQy5nZXRSZXNvbHZlcigndXBkYXRlQnlJZCcpLFxyXG4gIC8vIHVzZXJVcGRhdGVPbmU6IFVzZXJUQy5nZXRSZXNvbHZlcigndXBkYXRlT25lJyksXHJcbiAgLy8gdXNlclVwZGF0ZU1hbnk6IFVzZXJUQy5nZXRSZXNvbHZlcigndXBkYXRlTWFueScpLFxyXG4gIC8vIHVzZXJSZW1vdmVCeUlkOiBVc2VyVEMuZ2V0UmVzb2x2ZXIoJ3JlbW92ZUJ5SWQnKSxcclxuICAvLyB1c2VyUmVtb3ZlT25lOiBVc2VyVEMuZ2V0UmVzb2x2ZXIoJ3JlbW92ZU9uZScpLFxyXG4gIC8vIHVzZXJSZW1vdmVNYW55OiBVc2VyVEMuZ2V0UmVzb2x2ZXIoJ3JlbW92ZU1hbnknKSxcclxufVxyXG4iLCJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudidcclxuZG90ZW52LmNvbmZpZygpXHJcblxyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xyXG5pbXBvcnQgbm9kZUZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9jbGllbnQvY29tcG9uZW50cy9BcHAnO1xyXG5pbXBvcnQgSHRtbCBmcm9tICcuL2NsaWVudC9jb21wb25lbnRzL0h0bWwnO1xyXG5pbXBvcnQgY2h1bmtzIGZyb20gJy4vY2h1bmstbWFuaWZlc3QuanNvbic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLXVucmVzb2x2ZWRcclxuXHJcbmltcG9ydCBjcmVhdGVGZXRjaCBmcm9tICcuL2NyZWF0ZUZldGNoJztcclxuaW1wb3J0IHJvdXRlciBmcm9tICcuL2NsaWVudC9yb3V0ZXInO1xyXG5cclxuZ2xvYmFsLmFwcFJvb3QgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lKTtcclxuXHJcbmdsb2JhbC5ERVZFTE9QTUVOVCA9ICFwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT0gREFUQUJBU0UgPT09PT09PT09PT09PVxyXG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XHJcbmltcG9ydCAnbW9uZ29vc2UtdHlwZS1lbWFpbCc7XHJcbmltcG9ydCAnbW9uZ29vc2UtdHlwZS11cmwnO1xyXG5jb25zb2xlLmxvZyhwcm9jZXNzLmVudi5NT05HT0RCX1VSSSlcclxubW9uZ29vc2UuUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xyXG5tb25nb29zZS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJLCB7dXNlTmV3VXJsUGFyc2VyOiB0cnVlfSk7XHJcblxyXG52YXIgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xyXG5kYi5vbignZXJyb3InLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSwgJ0Nvbm5lY3Rpb24gZXJyb3I6JykpO1xyXG5kYi5vbmNlKCdvcGVuJywgY29uc29sZS5sb2cuYmluZChjb25zb2xlLCAnRGF0YWJhc2UgY29ubmVjdGVkLicpKTtcclxuLy8gPT09PT09PT09PT09PT0gL0RBVEFCQVNFID09PT09PT09PT09PT1cclxuXHJcbi8vID09PT09PT09PT09PT09IE1JRERMRVdBUkUgPT09PT09PT09PT09PVxyXG5cclxuY29uc3QgTW9uZ29TdG9yZSA9IHJlcXVpcmUoJ2Nvbm5lY3QtbW9uZ28nKShzZXNzaW9uKTtcclxuYXBwLnVzZShzZXNzaW9uKHtcclxuICAgIHN0b3JlOiBuZXcgTW9uZ29TdG9yZSh7IG1vbmdvb3NlQ29ubmVjdGlvbjogbW9uZ29vc2UuY29ubmVjdGlvbiB9KSxcclxuICAgIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VTU0lPTl9TRUNSRVQsXHJcbiAgICByZXNhdmU6IGZhbHNlLFxyXG4gICAgc2F2ZVVuaW5pdGlhbGl6ZWQ6IGZhbHNlXHJcbn0pKTtcclxuXHJcbmNvbnN0IHBhc3Nwb3J0ID0gcmVxdWlyZSgncGFzc3BvcnQnKTtcclxuY29uc3QgcGFzc3BvcnRBdXRoID0gcmVxdWlyZSgnLi9wYXNzcG9ydCcpO1xyXG5jb25zdCBtb3JnYW4gPSByZXF1aXJlKCdtb3JnYW4nKTtcclxuXHJcbmFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKVxyXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKVxyXG5cclxuLy8gYXBwLnVzZShleHByZXNzLnN0YXRpYygncHVibGljJykpO1xyXG5hcHAudXNlKG1vcmdhbignY29tYmluZWQnLCB7XHJcbiAgc2tpcDogZnVuY3Rpb24gKHJlcSwgcmVzKSB7IHJldHVybiByZXMuc3RhdHVzQ29kZSA8IDQwMCB9XHJcbn0pKVxyXG5hcHAudXNlKHJlcXVpcmUoJ2Nvb2tpZS1wYXJzZXInKSgpKTtcclxuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT0gL01JRERMRVdBUkUgPT09PT09PT09PT09PVxyXG5cclxuLy8gPT09PT09PT09PT09PT0gT0FVVEggPT09PT09PT09PT09PVxyXG5pbXBvcnQgT0F1dGggZnJvbSAnLi9vYXV0aCc7XHJcbk9BdXRoKGFwcCk7XHJcbi8vID09PT09PT09PT09PT09IC9PQVVUSCA9PT09PT09PT09PT09XHJcblxyXG4vLyA9PT09PT09PT09PT09PSBQVUJMSUMgPT09PT09PT09PT09PVxyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHJlcXVpcmUoXCJwYXRoXCIpLmpvaW4oX19kaXJuYW1lLCBcInB1YmxpY1wiKSwge1xyXG4gIGV4dGVuc2lvbnM6IFsnaHRtbCddXHJcbn0pKTtcclxuLy8gPT09PT09PT09PT09PT0gL1BVQkxJQyA9PT09PT09PT09PT09XHJcblxyXG4vLyA9PT09PT09PT09PT09PSBBUEkgPT09PT09PT09PT09PVxyXG5pbXBvcnQgeyBGYWNlYm9vaywgRmFjZWJvb2tBcGlFeGNlcHRpb24gfSBmcm9tICdmYic7XHJcbmNvbnN0IGZiID0gbmV3IEZhY2Vib29rKCk7XHJcbi8vID09PT09PT09PT09PT09IC9BUEkgPT09PT09PT09PT09PVxyXG5cclxuLy8gPT09PT09PT09PT09PT0gUkVBQ1QgU0VSVkVSIFNJREUgUkVOREVSSU5HID09PT09PT09PT09PT1cclxuXHJcbi8vXHJcbi8vIFJlZ2lzdGVyIHNlcnZlci1zaWRlIHJlbmRlcmluZyBtaWRkbGV3YXJlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmFwcC5nZXQoJyonLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY3NzID0gbmV3IFNldCgpO1xyXG5cclxuICAgIC8vIEVuYWJsZXMgY3JpdGljYWwgcGF0aCBDU1MgcmVuZGVyaW5nXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va3JpYXNvZnQvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXJcclxuICAgIGNvbnN0IGluc2VydENzcyA9ICguLi5zdHlsZXMpID0+IHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXHJcbiAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IGNzcy5hZGQoc3R5bGUuX2dldENzcygpKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFVuaXZlcnNhbCBIVFRQIGNsaWVudFxyXG4gICAgY29uc3QgZmV0Y2ggPSBjcmVhdGVGZXRjaChub2RlRmV0Y2gsIHtcclxuICAgICAgYmFzZVVybDogcHJvY2Vzcy5lbnYuV0VCX1VSSSxcclxuICAgICAgY29va2llOiByZXEuaGVhZGVycy5jb29raWUsXHJcbiAgICAgIC8vIHNjaGVtYSxcclxuICAgICAgLy8gZ3JhcGhxbCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEdsb2JhbCAoY29udGV4dCkgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGVhc2lseSBhY2Nlc3NlZCBmcm9tIGFueSBSZWFjdCBjb21wb25lbnRcclxuICAgIC8vIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvY29udGV4dC5odG1sXHJcbiAgICBjb25zdCBjb250ZXh0ID0ge1xyXG4gICAgICBpbnNlcnRDc3MsXHJcbiAgICAgIGZldGNoLFxyXG4gICAgICAvLyBUaGUgdHdpbnMgYmVsb3cgYXJlIHdpbGQsIGJlIGNhcmVmdWwhXHJcbiAgICAgIHBhdGhuYW1lOiByZXEucGF0aCxcclxuICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXIucmVzb2x2ZShjb250ZXh0KTtcclxuXHJcbiAgICBpZiAocm91dGUucmVkaXJlY3QpIHtcclxuICAgICAgcmVzLnJlZGlyZWN0KHJvdXRlLnN0YXR1cyB8fCAzMDIsIHJvdXRlLnJlZGlyZWN0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7IC4uLnJvdXRlIH07XHJcbiAgICBkYXRhLmNoaWxkcmVuID0gUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoXHJcbiAgICAgIDxBcHAgY29udGV4dD17Y29udGV4dH0+e3JvdXRlLmNvbXBvbmVudH08L0FwcD4sXHJcbiAgICApO1xyXG4gICAgZGF0YS5zdHlsZXMgPSBbeyBpZDogJ2NzcycsIGNzc1RleHQ6IFsuLi5jc3NdLmpvaW4oJycpIH1dO1xyXG5cclxuICAgIGNvbnN0IHNjcmlwdHMgPSBuZXcgU2V0KCk7XHJcbiAgICBjb25zdCBhZGRDaHVuayA9IGNodW5rID0+IHtcclxuICAgICAgaWYgKGNodW5rc1tjaHVua10pIHtcclxuICAgICAgICBjaHVua3NbY2h1bmtdLmZvckVhY2goYXNzZXQgPT4gc2NyaXB0cy5hZGQoYXNzZXQpKTtcclxuICAgICAgfSBlbHNlIGlmIChERVZFTE9QTUVOVCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2h1bmsgd2l0aCBuYW1lICcke2NodW5rfScgY2Fubm90IGJlIGZvdW5kYCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBhZGRDaHVuaygnY2xpZW50Jyk7XHJcbiAgICBpZiAocm91dGUuY2h1bmspIGFkZENodW5rKHJvdXRlLmNodW5rKTtcclxuICAgIGlmIChyb3V0ZS5jaHVua3MpIHJvdXRlLmNodW5rcy5mb3JFYWNoKGFkZENodW5rKTtcclxuXHJcbiAgICBkYXRhLnNjcmlwdHMgPSBBcnJheS5mcm9tKHNjcmlwdHMpO1xyXG4gICAgZGF0YS5hcHAgPSB7XHJcbiAgICAgIGFwaVVybDogcHJvY2Vzcy5lbnYuQVBJX1VSSSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaHRtbCA9IFJlYWN0RE9NLnJlbmRlclRvU3RhdGljTWFya3VwKDxIdG1sIHsuLi5kYXRhfSAvPik7XHJcbiAgICByZXMuc3RhdHVzKHJvdXRlLnN0YXR1cyB8fCAyMDApO1xyXG4gICAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIG5leHQoZXJyKTtcclxuICB9XHJcbn0pO1xyXG4vLyA9PT09PT09PT09PT09PSAvUkVBQ1QgU0VSVkVSIFNJREUgUkVOREVSSU5HID09PT09PT09PT09PT1cclxuXHJcbi8vID09PT09PT09PT09PT09IEdSQVBIUUwgPT09PT09PT09PT09PVxyXG5pbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIGdyYXBoaXFsRXhwcmVzcyB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XHJcbmltcG9ydCB7IGV4cHJlc3MgYXMgdm95YWdlck1pZGRsZXdhcmUgfSBmcm9tICdncmFwaHFsLXZveWFnZXIvbWlkZGxld2FyZSc7XHJcblxyXG4vLyBTZXRzIHRoZSByZXEudXNlciBpZiB0aGVyZSBpcyBhIHByb3ZpZGVkIGp3dCB0b2tlbi5cclxuZnVuY3Rpb24gQXV0aGVudGljYXRlKHJlcSwgcmVzLCBuZXh0KVxyXG57XHJcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdqd3QnLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XHJcbiAgIGlmIChlcnIpIHJldHVybiBuZXh0KGVycik7XHJcbiAgIGlmIChpbmZvKVxyXG4gICB7XHJcbiAgICAgaWYgKGluZm8gPT0gJ1Rva2VuRXhwaXJlZEVycm9yOiBqd3QgZXhwaXJlZCcpXHJcbiAgICAge1xyXG4gICAgICAgLy8gQ2xlYXIgb3V0IHRoZSB1c2Vycycgand0IHRva2VuLlxyXG4gICAgICAgcmVzLmNsZWFyQ29va2llKCdqd3QnKTtcclxuICAgICB9XHJcbiAgICAgZWxzZSBpZiAoaW5mbyAhPSAnRXJyb3I6IE5vIGF1dGggdG9rZW4nKVxyXG4gICAgIHtcclxuICAgICAgIHJldHVybiBuZXh0KGluZm8pO1xyXG4gICAgIH1cclxuICAgfVxyXG4gICByZXEudXNlciA9IHVzZXIgfHwgbnVsbDtcclxuICAgbmV4dCgpO1xyXG4gfSkocmVxLCByZXMsIG5leHQpO1xyXG59XHJcblxyXG5jb25zdCBmb3JtYXRFcnJvciA9IGVycm9yID0+IHtcclxuICBjb25zdCBtZXNzYWdlID0gZXJyb3Iub3JpZ2luYWxFcnJvciA/IGVycm9yLm9yaWdpbmFsRXJyb3IubWVzc2FnZSA6ICdBbiB1bmtvd24gZXJyb3Igb2NjdXJlZCc7XHJcbiAgY29uc3QgZGV0YWlscyA9IGVycm9yLm1lc3NhZ2UgfHwgJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJztcclxuICBjb25zdCBsb2NhdGlvbnMgPSBlcnJvci5sb2NhdGlvbnM7XHJcbiAgY29uc3QgcGF0aCA9IGVycm9yLnBhdGg7XHJcbiAgY29uc3QgZXh0ZW5zaW9ucyA9IGVycm9yLmV4dGVuc2lvbnM7XHJcbiAgY29uc3Qgc3RhY2sgPSBERVZFTE9QTUVOVCA/IGVycm9yLm9yaWdpbmFsRXJyb3IgOiBgT05MWSBBVkFJTEFCTEUgSU4gREVWRUxPUE1FTlQuIENIRUNLIFNFUlZFUiBMT0dTLiBEQVRFOiAke25ldyBEYXRlKCl9YDtcclxuXHJcbiAgY29uc29sZS5lcnJvcihlcnJvci5vcmlnaW5hbEVycm9yKTtcclxuXHJcbiAgcmV0dXJuIGV4dGVuc2lvbnNcclxuICAgID8geyBtZXNzYWdlLCBkZXRhaWxzLCBzdGFjaywgbG9jYXRpb25zLCBwYXRoLCBleHRlbnNpb25zIH1cclxuICAgIDogeyBtZXNzYWdlLCBkZXRhaWxzLCBzdGFjaywgbG9jYXRpb25zLCBwYXRoIH07XHJcbn1cclxuXHJcbmNvbnN0IGNvbnRleHQgPSAoe3JlcSwgcmVzfSkgPT4ge1xyXG4gIHJldHVybiByZXF1aXJlKCcuL2NvbnRleHQnKSh7cmVxLCBkYiwgcmVzLCBmYn0pXHJcbn1cclxuXHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgZ3JhcGhxbFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcclxuXHJcbmNvbnN0IHNlcnZlciA9IG5ldyBBcG9sbG9TZXJ2ZXIoe1xyXG4gIHNjaGVtYTogZ3JhcGhxbFNjaGVtYSxcclxuICBjb250ZXh0OiBjb250ZXh0LFxyXG4gIHRyYWNpbmc6IHRydWUsXHJcbiAgY2FjaGVDb250cm9sOiB0cnVlLFxyXG4gIGludHJvc3BlY3Rpb246IHRydWUsXHJcbiAgZm9ybWF0RXJyb3JcclxuICAvL2V4dGVuc2lvbnM6IFtQcm9maWxlckV4dGVuc2lvbl1cclxufSlcclxuc2VydmVyLmFwcGx5TWlkZGxld2FyZSh7IGFwcCB9KTtcclxuXHJcbmFwcC51c2UoJy9ncmFwaHFsJywgQXV0aGVudGljYXRlKTtcclxuLy8gYXBwLnVzZSgnL2dyYXBoaXFsJywgZ3JhcGhpcWxFeHByZXNzKHsgZW5kcG9pbnRVUkw6ICcvZ3JhcGhxbCcgfSkpO1xyXG5hcHAudXNlKCcvdm95YWdlcicsIHZveWFnZXJNaWRkbGV3YXJlKHsgZW5kcG9pbnRVcmw6ICcvZ3JhcGhxbCcgfSkpO1xyXG5cclxuLy8gPT09PT09PT09PT09PT0gL0dSQVBIUUwgPT09PT09PT09PT09PVxyXG5hcHAubGlzdGVuKHsgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB9LCAoKSA9PlxyXG4gIGNvbnNvbGUubG9nKGDwn5qAIFNlcnZlciByZWFkeSBhdCAke3Byb2Nlc3MuZW52LldFQl9VUkl9JHtzZXJ2ZXIuZ3JhcGhxbFBhdGh9YClcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcDtcclxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IEdyYXBoUUxJbnRlcmZhY2VUeXBlIH0gZnJvbSAnZ3JhcGhxbCc7XHJcbmltcG9ydCB7IEdyYXBoUUxFcnJvciB9IGZyb20gJ2dyYXBocWwvZXJyb3InO1xyXG5pbXBvcnQgeyBLaW5kIH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZSc7XHJcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICdncmFwaHFsLWN1c3RvbS10eXBlcyc7XHJcblxyXG5jb25zdCBmYWN0b3J5ID0gbmV3IEZhY3RvcnkoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBHcmFwaFFMR29vZ2xlSWQgPSBmYWN0b3J5LmdldFJlZ2V4U2NhbGFyKHtcclxuICAgIG5hbWU6ICdHb29nbGVJZCcsXHJcbiAgICByZWdleDogL15cXGQrJC9pLFxyXG4gICAgZGVzY3JpcHRpb246ICdBIGdvb2dsZSBwcm9maWxlIGlkLicsXHJcbiAgICBlcnJvcjogJ1F1ZXJ5IGVycm9yOiBOb3QgYSB2YWxpZCBHb29nbGVJZCdcclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vY2h1bmstbWFuaWZlc3QuanNvblwiKTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDMycHg7XFxuICBwYWRkaW5nOiAwIDJyZW07XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjODg4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjNTU1O1xcbn1cXG5cXG5wcmUge1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L1Byb2plY3RzL2hhY2tUaGVVL2FwcC9jbGllbnQvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7R0FPRzs7QUFFSDtFQUNFLGNBQWM7RUFDZCxvQkFBb0I7RUFDcEIsd0JBQXdCO0VBQ3hCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsWUFBWTtDQUNiOztBQUVEO0VBQ0UsVUFBVTtDQUNYOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLFlBQVk7Q0FDYjs7QUFFRDtFQUNFLHNCQUFzQjtFQUN0QixpQkFBaUI7Q0FDbEJcIixcImZpbGVcIjpcIkVycm9yUGFnZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAwIDMycHg7XFxuICBwYWRkaW5nOiAwIDJyZW07XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjODg4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGNvbG9yOiAjNTU1O1xcbn1cXG5cXG5wcmUge1xcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnknKTtcblxudmFyIF9zdHJpbmdpZnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3RyaW5naWZ5KTtcblxudmFyIF9zbGljZWRUb0FycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5Jyk7XG5cbnZhciBfc2xpY2VkVG9BcnJheTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zbGljZWRUb0FycmF5Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogSXNvbW9ycGhpYyBDU1Mgc3R5bGUgbG9hZGVyIGZvciBXZWJwYWNrXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTUtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcHJlZml4ID0gJ3MnO1xudmFyIGluc2VydGVkID0ge307XG5cbi8vIEJhc2U2NCBlbmNvZGluZyBhbmQgZGVjb2RpbmcgLSBUaGUgXCJVbmljb2RlIFByb2JsZW1cIlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd0Jhc2U2NC9CYXNlNjRfZW5jb2RpbmdfYW5kX2RlY29kaW5nI1RoZV9Vbmljb2RlX1Byb2JsZW1cbmZ1bmN0aW9uIGI2NEVuY29kZVVuaWNvZGUoc3RyKSB7XG4gIHJldHVybiBidG9hKGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2csIGZ1bmN0aW9uIChtYXRjaCwgcDEpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgcDEpO1xuICB9KSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHN0eWxlL2xpbmsgZWxlbWVudHMgZm9yIHNwZWNpZmllZCBub2RlIElEc1xuICogaWYgdGhleSBhcmUgbm8gbG9uZ2VyIHJlZmVyZW5jZWQgYnkgVUkgY29tcG9uZW50cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQ3NzKGlkcykge1xuICBpZHMuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBpZiAoLS1pbnNlcnRlZFtpZF0gPD0gMCkge1xuICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXggKyBpZCk7XG4gICAgICBpZiAoZWxlbSkge1xuICAgICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBFeGFtcGxlOlxuICogICAvLyBJbnNlcnQgQ1NTIHN0eWxlcyBvYmplY3QgZ2VuZXJhdGVkIGJ5IGBjc3MtbG9hZGVyYCBpbnRvIERPTVxuICogICB2YXIgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKFtbMSwgJ2JvZHkgeyBjb2xvcjogcmVkOyB9J11dKTtcbiAqXG4gKiAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBET01cbiAqICAgcmVtb3ZlQ3NzKCk7XG4gKi9cbmZ1bmN0aW9uIGluc2VydENzcyhzdHlsZXMpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZiRyZXBsYWNlID0gX3JlZi5yZXBsYWNlLFxuICAgICAgcmVwbGFjZSA9IF9yZWYkcmVwbGFjZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHJlcGxhY2UsXG4gICAgICBfcmVmJHByZXBlbmQgPSBfcmVmLnByZXBlbmQsXG4gICAgICBwcmVwZW5kID0gX3JlZiRwcmVwZW5kID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkcHJlcGVuZDtcblxuICB2YXIgaWRzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9zdHlsZXMkaSA9ICgwLCBfc2xpY2VkVG9BcnJheTMuZGVmYXVsdCkoc3R5bGVzW2ldLCA0KSxcbiAgICAgICAgbW9kdWxlSWQgPSBfc3R5bGVzJGlbMF0sXG4gICAgICAgIGNzcyA9IF9zdHlsZXMkaVsxXSxcbiAgICAgICAgbWVkaWEgPSBfc3R5bGVzJGlbMl0sXG4gICAgICAgIHNvdXJjZU1hcCA9IF9zdHlsZXMkaVszXTtcblxuICAgIHZhciBpZCA9IG1vZHVsZUlkICsgJy0nICsgaTtcblxuICAgIGlkcy5wdXNoKGlkKTtcblxuICAgIGlmIChpbnNlcnRlZFtpZF0pIHtcbiAgICAgIGlmICghcmVwbGFjZSkge1xuICAgICAgICBpbnNlcnRlZFtpZF0rKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0ZWRbaWRdID0gMTtcblxuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4ICsgaWQpO1xuICAgIHZhciBjcmVhdGUgPSBmYWxzZTtcblxuICAgIGlmICghZWxlbSkge1xuICAgICAgY3JlYXRlID0gdHJ1ZTtcblxuICAgICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgZWxlbS5pZCA9IHByZWZpeCArIGlkO1xuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjc3NUZXh0ID0gY3NzO1xuICAgIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHNraXAgSUU5IGFuZCBiZWxvdywgc2VlIGh0dHA6Ly9jYW5pdXNlLmNvbS9hdG9iLWJ0b2FcbiAgICAgIGNzc1RleHQgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGI2NEVuY29kZVVuaWNvZGUoKDAsIF9zdHJpbmdpZnkyLmRlZmF1bHQpKHNvdXJjZU1hcCkpICsgJyovJztcbiAgICAgIGNzc1RleHQgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5maWxlICsgJz8nICsgaWQgKyAnKi8nO1xuICAgIH1cblxuICAgIGlmICgndGV4dENvbnRlbnQnIGluIGVsZW0pIHtcbiAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgfVxuXG4gICAgaWYgKGNyZWF0ZSkge1xuICAgICAgaWYgKHByZXBlbmQpIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoZWxlbSwgZG9jdW1lbnQuaGVhZC5jaGlsZE5vZGVzWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlbW92ZUNzcy5iaW5kKG51bGwsIGlkcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0Q3NzOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBiYWJlbC9wb2x5ZmlsbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzbmFtZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tb25nb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtc2Vzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmYlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaW5kb3JjcmVhdGUtcHJvbWlzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtY29tcG9zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsLWNvbXBvc2UtbW9uZ29vc2Uvbm9kZThcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC1jdXN0b20tdHlwZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC12b3lhZ2VyL21pZGRsZXdhcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbC9lcnJvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsL2xhbmd1YWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3RvcnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL3dpdGhTdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9uZ29vc2UtdHlwZS1lbWFpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZS10eXBlLXVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb3JnYW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1nb29nbGUtb2F1dGgyMFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydC1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VyaWFsaXplLWphdmFzY3JpcHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5pdmVyc2FsLXJvdXRlclwiKTsiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3d0JBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpCQTtBQUNBO0FBREE7QUFFQTtBQUNBO0FBRkE7QUFDQTtBQUZBO0FBQ0E7QUFrQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvREE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBb0JBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUNBO0FBdkVBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBWEE7QUFDQTtBQUZBO0FBZ0JBO0FBQ0E7QUFGQTtBQUNBO0FBeURBOzs7Ozs7OztBQ3hGQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQVpBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBOzs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUE5QkE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBQ0E7QUFGQTtBQVVBO0FBREE7QUFDQTtBQXNCQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9DQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBOzs7Ozs7Ozs7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBLDJVQUFBO0FBRkE7QUFLQTtBQUNBLG9WQUFBO0FBRkE7QUFLQTtBQUNBLDhVQUFBO0FBRkE7QUFLQTtBQUNBLHVWQUFBO0FBRkE7QUFLQTtBQUNBLDhVQUFBO0FBRkE7QUFLQTtBQUNBLG9WQUFBO0FBRkE7QUFLQTtBQUNBLDhVQUFBO0FBRkE7QUFNQTtBQUNBO0FBQ0EsMFZBQUE7QUFGQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFSQTtBQVNBO0FBQ0E7QUFuREE7QUFDQTtBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU1BO0FBRUE7QUFDQTtBQURBO0FBREE7QUFSQTtBQUhBO0FBbUJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBUEE7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQURBO0FBREE7QUFGQTtBQVlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQUE7QUFIQTs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFEQTtBQUZBO0FBWUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7OztBQXNCQTs7Ozs7O0FBTUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFHQTtBQUFBO0FBUEE7QUFXQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFIQTtBQVNBO0FBQ0E7QUE3QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTZCQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBTEE7QUFTQTtBQUNBO0FBWEE7QUFhQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBRUE7QUFDQTtBQUZBO0FBaEVBO0FBc0VBO0FBREE7QUFHQTtBQUVBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFJQTs7Ozs7Ozs7QUMzRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7QUNEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFNQTtBQUFBO0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUxBO0FBYkE7QUFvQkE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFHQTtBQUFBO0FBR0E7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRkE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQTlCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBK0JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFaQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBWUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBakJBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFMQTtBQVFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUtBO0FBS0E7QUFDQTs7Ozs7Ozs7QUN0QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFXQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbEVBO0FBQUE7QUFBQTtBQUFBO0FBb0VBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUlBOzs7Ozs7OztBQzNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7Ozs7Ozs7QUNUQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNIQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==