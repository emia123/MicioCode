import { javascriptGenerator, Order } from 'blockly/javascript';
import * as Blockly from 'blockly/core';

export const setupGenerators = () => {
  const ORDER_NONE = (Order && Order.NONE !== undefined) ? Order.NONE : 99;
  const ORDER_ATOMIC = (Order && Order.ATOMIC !== undefined) ? Order.ATOMIC : 0;
  const ORDER_FUNCTION_CALL = (Order && Order.FUNCTION_CALL !== undefined) ? Order.FUNCTION_CALL : 2;

  // --- 1. LOGICA (Rosso) ---

  javascriptGenerator.forBlock['logic_on_start'] = function() {
    return '';
  };

  javascriptGenerator.forBlock['logic_wait_ms'] = function(block: any, generator: any) {
    const ms = (generator || javascriptGenerator).valueToCode(block, 'MS', ORDER_NONE) || '1000';
    return `await sprite.waitMs(${ms});\n`;
  };

  javascriptGenerator.forBlock['logic_if_switch'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const condition = gen.valueToCode(block, 'CONDITION', ORDER_NONE) || 'false';
    const isTrue = block.getFieldValue('IS_TRUE') === 'TRUE';
    const branch = gen.statementToCode(block, 'DO');
    return `if (Boolean(${condition}) === ${isTrue}) {\n${branch}}\n`;
  };

  javascriptGenerator.forBlock['logic_forever'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const branch = gen.statementToCode(block, 'DO');
    return `while (!sprite.isStopped()) {\n${branch}  await sprite.yield();\n}\n`;
  };

  javascriptGenerator.forBlock['logic_when'] = function() {
    return ''; // Event trigger handled in compiler
  };

  javascriptGenerator.forBlock['logic_send_script'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const target = block.getFieldValue('TARGET_SPRITE');
    const branch = gen.statementToCode(block, 'SCRIPT');
    return `await sprite.sendScript("${target}", async (targetSprite) => {\nconst sprite = targetSprite;\n${branch}});\n`;
  };

  javascriptGenerator.forBlock['event_when_sprite_clicked'] = function() {
    return '';
  };

  javascriptGenerator.forBlock['logic_control_script'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const action = block.getFieldValue('ACTION');
    const branch = gen.statementToCode(block, 'SCRIPT');
    return `await sprite.controlScript("${action}", async () => {\n${branch}});\n`;
  };

  javascriptGenerator.forBlock['logic_if_multi_switch'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const c1 = gen.valueToCode(block, 'COND1', ORDER_NONE) || 'false';
    const t1 = block.getFieldValue('IS_TRUE1') === 'TRUE';
    const b1 = gen.statementToCode(block, 'DO1');

    const c2 = gen.valueToCode(block, 'COND2', ORDER_NONE) || 'false';
    const t2 = block.getFieldValue('IS_TRUE2') === 'TRUE';
    const b2 = gen.statementToCode(block, 'DO2');

    const c3 = gen.valueToCode(block, 'COND3', ORDER_NONE) || 'false';
    const t3 = block.getFieldValue('IS_TRUE3') === 'TRUE';
    const b3 = gen.statementToCode(block, 'DO3');

    return `if (Boolean(${c1}) === ${t1}) {\n${b1}} else if (Boolean(${c2}) === ${t2}) {\n${b2}} else if (Boolean(${c3}) === ${t3}) {\n${b3}}\n`;
  };

  // --- 2. ANIMAZIONI (Arancione) ---

  javascriptGenerator.forBlock['anim_move_steps'] = function(block: any, generator: any) {
    const steps = (generator || javascriptGenerator).valueToCode(block, 'STEPS', ORDER_NONE) || '10';
    return `await sprite.moveSteps(${steps});\n`;
  };

  javascriptGenerator.forBlock['anim_rotate'] = function(block: any, generator: any) {
    const dir = block.getFieldValue('DIRECTION');
    const deg = (generator || javascriptGenerator).valueToCode(block, 'DEGREES', ORDER_NONE) || '5';
    const mult = dir === 'CW' ? 1 : -1;
    return `await sprite.rotate(${deg} * ${mult});\n`;
  };

  javascriptGenerator.forBlock['anim_goto_xy'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const x = gen.valueToCode(block, 'X', ORDER_NONE) || '0';
    const y = gen.valueToCode(block, 'Y', ORDER_NONE) || '0';
    return `await sprite.goToXY(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock['anim_glide_xy'] = function(block: any, generator: any) {
    const gen = generator || javascriptGenerator;
    const x = gen.valueToCode(block, 'X', ORDER_NONE) || '0';
    const y = gen.valueToCode(block, 'Y', ORDER_NONE) || '0';
    const secs = gen.valueToCode(block, 'SECS', ORDER_NONE) || '10';
    return `await sprite.glideSecsToXY(${x}, ${y}, ${secs});\n`;
  };

  javascriptGenerator.forBlock['anim_bounce_edge'] = function() {
    return `await sprite.bounceOnEdge();\n`;
  };

  javascriptGenerator.forBlock['anim_set_speed'] = function(block: any, generator: any) {
    const speed = (generator || javascriptGenerator).valueToCode(block, 'SPEED', ORDER_NONE) || '10';
    return `await sprite.setSpeed(${speed});\n`;
  };

  // --- 3. ASPETTO (Giallo) ---

  javascriptGenerator.forBlock['looks_show'] = function() {
    return `await sprite.show();\n`;
  };

  javascriptGenerator.forBlock['looks_hide'] = function() {
    return `await sprite.hide();\n`;
  };

  javascriptGenerator.forBlock['looks_change_size'] = function(block: any, generator: any) {
    const change = (generator || javascriptGenerator).valueToCode(block, 'CHANGE', ORDER_NONE) || '10';
    return `await sprite.changeSizeBy(${change});\n`;
  };

  javascriptGenerator.forBlock['looks_reset_size'] = function() {
    return `await sprite.resetSize();\n`;
  };

  javascriptGenerator.forBlock['looks_change_effect'] = function(block: any, generator: any) {
    const effect = block.getFieldValue('EFFECT');
    const change = (generator || javascriptGenerator).valueToCode(block, 'CHANGE', ORDER_NONE) || '10';
    return `await sprite.changeEffect("${effect}", ${change});\n`;
  };

  javascriptGenerator.forBlock['looks_next_costume'] = function() {
    return `await sprite.nextCostume();\n`;
  };

  javascriptGenerator.forBlock['looks_goto_costume'] = function(block: any, generator: any) {
    const costume = (generator || javascriptGenerator).valueToCode(block, 'COSTUME', ORDER_NONE) || '1';
    return `await sprite.gotoCostume(${costume});\n`;
  };

  javascriptGenerator.forBlock['math_arithmetic'] = function(block: any, generator: any) {
    const a = (generator || javascriptGenerator).valueToCode(block, 'A', ORDER_NONE) || '0';
    const b = (generator || javascriptGenerator).valueToCode(block, 'B', ORDER_NONE) || '0';
    const op = block.getFieldValue('OP');
    return [`(${a} ${op} ${b})`, ORDER_NONE];
  };
  javascriptGenerator.forBlock['math_functions'] = function(block: any, generator: any) {
    const num = (generator || javascriptGenerator).valueToCode(block, 'NUM', ORDER_NONE) || '0';
    const func = block.getFieldValue('FUNC');
    return [`Math.${func}(${num})`, ORDER_FUNCTION_CALL];
  };
  javascriptGenerator.forBlock['math_round'] = function(block: any, generator: any) {
    const num = (generator || javascriptGenerator).valueToCode(block, 'NUM', ORDER_NONE) || '0';
    return [`Math.round(${num})`, ORDER_FUNCTION_CALL];
  };
  javascriptGenerator.forBlock['math_modulo_currency'] = function(block: any, generator: any) {
    const num = (generator || javascriptGenerator).valueToCode(block, 'NUM', ORDER_NONE) || '0';
    return [`(${num} % 1)`, ORDER_NONE];
  };
  javascriptGenerator.forBlock['math_random'] = function(block: any, generator: any) {
    const min = (generator || javascriptGenerator).valueToCode(block, 'MIN', ORDER_NONE) || '1';
    const max = (generator || javascriptGenerator).valueToCode(block, 'MAX', ORDER_NONE) || '100';
    return [`(Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min})`, ORDER_FUNCTION_CALL];
  };
  javascriptGenerator.forBlock['math_convert'] = function(block: any, generator: any) {
    const val = (generator || javascriptGenerator).valueToCode(block, 'VAL', ORDER_NONE) || '0';
    return [val, ORDER_NONE];
  };

  javascriptGenerator.forBlock['data_add_item'] = function(block: any, generator: any) {
    const name = (generator || javascriptGenerator).valueToCode(block, 'NAME', ORDER_NONE) || '""';
    const id = (generator || javascriptGenerator).valueToCode(block, 'ID', ORDER_NONE) || '""';
    const list = block.getFieldValue('LIST');
    return `await sprite.dataAddItem("${list}", ${name}, ${id});\n`;
  };
  javascriptGenerator.forBlock['data_remove_item'] = function(block: any, generator: any) {
    const id = (generator || javascriptGenerator).valueToCode(block, 'ID', ORDER_NONE) || '""';
    const name = (generator || javascriptGenerator).valueToCode(block, 'NAME', ORDER_NONE) || '""';
    return `await sprite.dataRemoveItem(${id}, ${name});\n`;
  };
  javascriptGenerator.forBlock['data_get_list_items'] = function(block: any) {
    const list = block.getFieldValue('LIST');
    return [`sprite.dataGetListItems("${list}")`, ORDER_FUNCTION_CALL];
  };
  javascriptGenerator.forBlock['data_rename_item'] = function(block: any, generator: any) {
    const oldName = (generator || javascriptGenerator).valueToCode(block, 'OLD_NAME', ORDER_NONE) || '""';
    const newName = (generator || javascriptGenerator).valueToCode(block, 'NEW_NAME', ORDER_NONE) || '""';
    const newId = (generator || javascriptGenerator).valueToCode(block, 'NEW_ID', ORDER_NONE) || '""';
    return `await sprite.dataRenameItem(${oldName}, ${newName}, ${newId});\n`;
  };
  javascriptGenerator.forBlock['data_move_item'] = function(block: any, generator: any) {
    const name = (generator || javascriptGenerator).valueToCode(block, 'NAME', ORDER_NONE) || '""';
    const pos = (generator || javascriptGenerator).valueToCode(block, 'POS', ORDER_NONE) || '0';
    return `await sprite.dataMoveItem(${name}, ${pos});\n`;
  };
  javascriptGenerator.forBlock['data_on_list_change'] = function() {
    return '';
  };
  javascriptGenerator.forBlock['data_get_item_name_by_id'] = function(block: any, generator: any) {
    const id = (generator || javascriptGenerator).valueToCode(block, 'ID', ORDER_NONE) || '""';
    const list = block.getFieldValue('LIST');
    return [`sprite.dataGetItemNameById("${list}", ${id})`, ORDER_FUNCTION_CALL];
  };
  javascriptGenerator.forBlock['data_get_item_id_by_name'] = function(block: any, generator: any) {
    const name = (generator || javascriptGenerator).valueToCode(block, 'NAME', ORDER_NONE) || '""';
    const list = block.getFieldValue('LIST');
    return [`sprite.dataGetItemIdByName("${list}", ${name})`, ORDER_FUNCTION_CALL];
  };

  // --- 5. BALOON ---
  
  javascriptGenerator.forBlock['balloon_say'] = function(block: any, generator: any) {
    const message = (generator || javascriptGenerator).valueToCode(block, 'MESSAGE', ORDER_NONE) || '""';
    return `await sprite.say(${message});\n`;
  };

  javascriptGenerator.forBlock['balloon_think'] = function(block: any, generator: any) {
    const message = (generator || javascriptGenerator).valueToCode(block, 'MESSAGE', ORDER_NONE) || '""';
    return `await sprite.think(${message});\n`;
  };

  javascriptGenerator.forBlock['balloon_shout'] = function(block: any, generator: any) {
    const message = (generator || javascriptGenerator).valueToCode(block, 'MESSAGE', ORDER_NONE) || '""';
    return `await sprite.shout(${message});\n`;
  };

  javascriptGenerator.forBlock['balloon_stop'] = function() {
    return `await sprite.stopTalking();\n`;
  };

  // --- 4. SUONO (Verde) ---

  javascriptGenerator.forBlock['sound_start'] = function(block: any) {
    const sound = block.getFieldValue('SOUND');
    return `await sprite.startSound("${sound}");\n`;
  };

  javascriptGenerator.forBlock['sound_start_at_secs'] = function(block: any, generator: any) {
    const sound = block.getFieldValue('SOUND');
    const secs = (generator || javascriptGenerator).valueToCode(block, 'SECS', ORDER_NONE) || '5';
    return `await sprite.startSoundAtSecs("${sound}", ${secs});\n`;
  };

  javascriptGenerator.forBlock['sound_change_volume'] = function(block: any, generator: any) {
    const change = (generator || javascriptGenerator).valueToCode(block, 'CHANGE', ORDER_NONE) || '10';
    return `await sprite.changeVolume(${change});\n`;
  };

  javascriptGenerator.forBlock['sound_set_hz'] = function(block: any, generator: any) {
    const hz = (generator || javascriptGenerator).valueToCode(block, 'HZ', ORDER_NONE) || '1000';
    return `await sprite.setHz(${hz});\n`;
  };

  javascriptGenerator.forBlock['sound_stop_all'] = function() {
    return `await sprite.stopAllSounds();\n`;
  };

  // --- 5. CONDIZIONI & SENSORI (Azzurro) ---

  javascriptGenerator.forBlock['condition_touching_edge'] = function(_block: any, _generator: any) {
    return [`sprite.isTouchingEdge()`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['condition_touching_mouse'] = function(_block: any, _generator: any) {
    return [`sprite.isTouchingMouse()`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['condition_key_pressed'] = function(block: any, _generator: any) {
    const key = block.getFieldValue('KEY');
    return [`sprite.isKeyPressed("${key}")`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['condition_mouse_down'] = function(_block: any, _generator: any) {
    return [`sprite.isMouseDown()`, ORDER_FUNCTION_CALL];
  };

  // Backwards compatibility for any legacy blocks
  javascriptGenerator.forBlock['event_whenflagclicked'] = function() {
    return '';
  };
  javascriptGenerator.forBlock['motion_movesteps'] = function(block: any, generator: any) {
    const steps = (generator || javascriptGenerator).valueToCode(block, 'STEPS', ORDER_NONE) || '10';
    return `await sprite.moveSteps(${steps});\n`;
  };

// --- ESTENSIONI: Richieste Web (Verde Scuro) ---
  javascriptGenerator.forBlock['web_request_get'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    return [`(await sprite.webGet(${url}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_request_get_json'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    return [`(await sprite.webGetJson(${url}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_request_post'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    const body = (generator || javascriptGenerator).valueToCode(block, 'BODY', ORDER_NONE) || '""';
    return [`(await sprite.webPost(${url}, ${body}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_request_put'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    const body = (generator || javascriptGenerator).valueToCode(block, 'BODY', ORDER_NONE) || '""';
    return [`(await sprite.webPut(${url}, ${body}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_request_delete'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    return [`(await sprite.webDelete(${url}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_header_set'] = function(block, generator) {
    const key = (generator || javascriptGenerator).valueToCode(block, 'KEY', ORDER_NONE) || '""';
    const value = (generator || javascriptGenerator).valueToCode(block, 'VALUE', ORDER_NONE) || '""';
    return `sprite.webSetHeader(${key}, ${value});\n`;
  };

  javascriptGenerator.forBlock['web_header_clear'] = function() {
    return `sprite.webClearHeaders();\n`;
  };

  javascriptGenerator.forBlock['web_response_status'] = function() {
    return [`sprite.webLastStatus()`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['web_response_ok'] = function() {
    return [`sprite.webLastOk()`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['web_response_header'] = function(block, generator) {
    const key = (generator || javascriptGenerator).valueToCode(block, 'KEY', ORDER_NONE) || '""';
    return [`sprite.webLastHeader(${key})`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['web_fetch_image'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    return [`(await sprite.webFetchImage(${url}))`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_url_encode'] = function(block, generator) {
    const text = (generator || javascriptGenerator).valueToCode(block, 'TEXT', ORDER_NONE) || '""';
    return [`encodeURIComponent(${text})`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_url_decode'] = function(block, generator) {
    const text = (generator || javascriptGenerator).valueToCode(block, 'TEXT', ORDER_NONE) || '""';
    return [`decodeURIComponent(${text})`, ORDER_NONE];
  };

  javascriptGenerator.forBlock['web_json_parse'] = function(block, generator) {
    const key = (generator || javascriptGenerator).valueToCode(block, 'KEY', ORDER_NONE) || '""';
    const json = (generator || javascriptGenerator).valueToCode(block, 'JSON', ORDER_NONE) || '""';
    return [`sprite.webParseJson(${json}, ${key})`, ORDER_FUNCTION_CALL];
  };

  javascriptGenerator.forBlock['web_redirect'] = function(block, generator) {
    const url = (generator || javascriptGenerator).valueToCode(block, 'URL', ORDER_NONE) || '""';
    return `await sprite.webRedirect(${url});\n`;
  };


};

export const generateCodeForBlock = (block: Blockly.Block): string => {
  try {
    (javascriptGenerator as any).init(block.workspace);
    const code = (javascriptGenerator as any).blockToCode(block);
    if (typeof code === 'string') {
      return code;
    }
    if (Array.isArray(code)) {
      return code[0];
    }
    return '';
  } catch (err) {
    console.error("Error generating code for single block:", err);
    return '';
  }
};

export const generateCodeForStart = (workspace: Blockly.WorkspaceSvg): string[] => {
  (javascriptGenerator as any).init(workspace);
  const blocks = workspace.getTopBlocks(true);
  const scripts: string[] = [];

  for (const block of blocks) {
    if (block.type === 'logic_on_start' || block.type === 'event_whenflagclicked') {
      const nextBlock = block.getNextBlock();
      if (nextBlock) {
        const code = (javascriptGenerator as any).blockToCode(nextBlock) as string;
        if (code && code.trim()) scripts.push(code);
      }
    } else if (block.type !== 'logic_when') {
      // Allow executing any loose stack or block that the user dragged into the workspace
      const code = (javascriptGenerator as any).blockToCode(block) as string;
      if (typeof code === 'string' && code.trim()) {
        scripts.push(code);
      }
    }
  }

  return scripts;
};

export const generateCodeForWhenTriggers = (workspace: Blockly.WorkspaceSvg): { conditionCode: string, bodyCode: string }[] => {
  const ORDER_NONE = (Order && Order.NONE !== undefined) ? Order.NONE : 99;
  (javascriptGenerator as any).init(workspace);
  const blocks = workspace.getTopBlocks(true);
  const triggers: { conditionCode: string, bodyCode: string }[] = [];

  for (const block of blocks) {
    if (block.type === 'logic_when') {
      const cond = (javascriptGenerator as any).valueToCode(block, 'CONDITION', ORDER_NONE) || 'false';
      const nextBlock = block.getNextBlock();
      if (nextBlock) {
        const body = (javascriptGenerator as any).blockToCode(nextBlock) as string;
        if (body && body.trim()) {
          triggers.push({ conditionCode: cond, bodyCode: body });
        }
      }
    }
  }

  return triggers;
};

export const generateCodeForSpriteClicked = (workspace: Blockly.WorkspaceSvg): string[] => {
  (javascriptGenerator as any).init(workspace);
  const blocks = workspace.getTopBlocks(true);
  const scripts: string[] = [];

  for (const block of blocks) {
    if (block.type === 'event_when_sprite_clicked') {
      const nextBlock = block.getNextBlock();
      if (nextBlock) {
        const code = (javascriptGenerator as any).blockToCode(nextBlock) as string;
        if (code && code.trim()) scripts.push(code);
      }
    }
  }

  return scripts;
};

