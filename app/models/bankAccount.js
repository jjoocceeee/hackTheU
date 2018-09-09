const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;
const BankAccountSchema = new mongoose.Schema({
    routing: {
    type: String,
    description: "Bank Routing Number",
    index: true
    },
    bank: {
    type: String,
    description: "Name of Bank used",
    index: true
    },
  checking: {
    type: Number,
    description: "Checking Account Information",
    index: true
  },
  savings: {
    type: Number,
    description: "Savings Account Information",
    index: true
  },
}, { timestamps: true });


export const BankAccount = mongoose.model('BankAccount', BankAccountSchema);
export default BankAccount;
