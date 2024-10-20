const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  type: String,
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
  value: mongoose.Schema.Types.Mixed,
});

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruleString: { type: String, required: true }, // Store original rule string
  root: { type: Object, required: true }, // Parsed AST
});

module.exports = mongoose.model('Rule', ruleSchema);
