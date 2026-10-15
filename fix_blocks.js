const fs = require('fs');
let code = fs.readFileSync('src/components/BlocklyEditor.tsx', 'utf-8');

// Replace hardcoded strings with Blockly.Msg lookups or dynamic fields.
// Actually, inside `init()`, we can just do: `this.appendDummyInput().appendField(() => Blockly.Msg["BKY_..."])`
// Wait, Blockly doesn't support a function in appendField directly unless it's a dynamic field. But we can just use strings.
// When language changes, `init` isn't re-run for existing blocks unless we re-inject the workspace.
// Wait, Blockly has a native way to do messages:
// In init: `this.jsonInit({ "message0": "%{BKY_LOGIC_ON_START}", ... })` 
// Or using appendField: `this.appendField(Blockly.Msg['BKY_LOGIC_ON_START'])`
// Since we are re-injecting the workspace on language change, `appendField(Blockly.Msg['BKY_...'])` will work perfectly!

code = code.replace(/.appendField\("🚩 all'avvio"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_ON_START'])`);
code = code.replace(/.appendField\("attendi"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_WAIT_MS_0'])`);
code = code.replace(/.appendField\("millisecondi"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_WAIT_MS_1'])`);
code = code.replace(/.appendField\("se"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_0'])`);
code = code.replace(/.appendField\("è"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'])`);
code = code.replace(/.appendField\("allora"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'])`);
code = code.replace(/"vero", "TRUE"/g, `Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'], "TRUE"`);
code = code.replace(/"falso", "FALSE"/g, `Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'], "FALSE"`);
code = code.replace(/.appendField\("🔁 per sempre"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_FOREVER'])`);
code = code.replace(/.appendField\("⚡ quando"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_WHEN'])`);
code = code.replace(/.appendField\("📨 manda script a"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_0'])`);
code = code.replace(/.appendField\("script:"\)/g, `.appendField(Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_1'])`);
//... this script might be fragile. 
