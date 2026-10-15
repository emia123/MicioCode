import * as Blockly from 'blockly/core';
import { translations, LanguageCode } from './translations';
import * as It from 'blockly/msg/it';
import * as En from 'blockly/msg/en';
import * as Es from 'blockly/msg/es';
import * as Fr from 'blockly/msg/fr';
import * as Zh from 'blockly/msg/zh-hans';
import * as Ja from 'blockly/msg/ja';

const blocklyLocales: Record<string, any> = {
  it: It,
  en: En,
  es: Es,
  fr: Fr,
  zh: Zh,
  ja: Ja
};

export const updateBlocklyLanguage = (lang: LanguageCode) => {
  if (blocklyLocales[lang]) {
    Blockly.setLocale(blocklyLocales[lang] as any);
  } else {
    Blockly.setLocale(blocklyLocales['en'] as any);
  }

  const t = translations[lang] || translations['en'];

  // Map translations to the keys expected by BlocklyEditor.tsx
  Blockly.Msg['BKY_LOGIC_ON_START'] = t.blocks.logic_on_start;
  Blockly.Msg['BKY_LOGIC_WAIT_MS_0'] = t.blocks.logic_wait_ms[0];
  Blockly.Msg['BKY_LOGIC_WAIT_MS_1'] = t.blocks.logic_wait_ms[1];
  Blockly.Msg['BKY_LOGIC_IF_SWITCH_0'] = t.blocks.logic_if_switch[0];
  Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'] = t.blocks.logic_if_switch[1];
  Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'] = t.blocks.logic_if_switch[2];
  Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'] = t.blocks.logic_if_switch[3];
  Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'] = t.blocks.logic_if_switch[4];
  Blockly.Msg['BKY_LOGIC_FOREVER'] = t.blocks.logic_forever;
  Blockly.Msg['BKY_LOGIC_WHEN'] = t.blocks.logic_when;
  Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_0'] = t.blocks.logic_send_script[0];
  Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_1'] = t.blocks.logic_send_script[1];
  Blockly.Msg['BKY_LOGIC_CONTROL_0'] = t.blocks.logic_control_script[0];
  Blockly.Msg['BKY_LOGIC_CONTROL_1'] = t.blocks.logic_control_script[1];
  Blockly.Msg['BKY_LOGIC_CONTROL_2'] = t.blocks.logic_control_script[2];
  Blockly.Msg['BKY_LOGIC_CONTROL_3'] = t.blocks.logic_control_script[3];
  Blockly.Msg['BKY_ANIM_MOVE_0'] = t.blocks.anim_move_steps[0];
  Blockly.Msg['BKY_ANIM_MOVE_1'] = t.blocks.anim_move_steps[1];
  Blockly.Msg['BKY_ANIM_ROTATE_0'] = t.blocks.anim_rotate[0];
  Blockly.Msg['BKY_ANIM_ROTATE_1'] = t.blocks.anim_rotate[1];
  Blockly.Msg['BKY_ANIM_GOTO_0'] = t.blocks.anim_goto_xy[0];
  Blockly.Msg['BKY_ANIM_GOTO_1'] = t.blocks.anim_goto_xy[1];
  Blockly.Msg['BKY_ANIM_GLIDE_0'] = t.blocks.anim_glide_xy[0];
  Blockly.Msg['BKY_ANIM_GLIDE_2'] = t.blocks.anim_glide_xy[1]; // using index 1 as string 2
  Blockly.Msg['BKY_ANIM_BOUNCE'] = t.blocks.anim_bounce_edge;
  Blockly.Msg['BKY_ANIM_SPEED'] = t.blocks.anim_set_speed;
  Blockly.Msg['BKY_LOOKS_SHOW'] = t.blocks.looks_show;
  Blockly.Msg['BKY_LOOKS_HIDE'] = t.blocks.looks_hide;
  Blockly.Msg['BKY_LOOKS_CHANGE_SIZE'] = t.blocks.looks_change_size;
  Blockly.Msg['BKY_LOOKS_RESET_SIZE'] = t.blocks.looks_reset_size;
  Blockly.Msg['BKY_LOOKS_CHANGE_EFFECT'] = t.blocks.looks_change_effect;
  Blockly.Msg['BKY_LOOKS_NEXT_COSTUME'] = t.blocks.looks_next_costume;
  Blockly.Msg['BKY_LOOKS_GOTO_COSTUME'] = t.blocks.looks_goto_costume;
  Blockly.Msg['BKY_SOUND_START'] = t.blocks.sound_start;
  Blockly.Msg['BKY_SOUND_START_AT_1'] = t.blocks.sound_start_at_secs[1].split(' ')[0] || t.blocks.sound_start_at_secs[1];
  Blockly.Msg['BKY_SOUND_START_AT_2'] = t.blocks.sound_start_at_secs[1].split(' ')[1] || t.blocks.sound_start_at_secs[1];
  Blockly.Msg['BKY_SOUND_VOLUME'] = t.blocks.sound_change_volume[0];
  Blockly.Msg['BKY_SOUND_HZ'] = t.blocks.sound_set_hz[0];
  Blockly.Msg['BKY_BALLOON_SAY'] = t.blocks.balloon_say[0];
  Blockly.Msg['BKY_BALLOON_THINK'] = t.blocks.balloon_think[0];
  Blockly.Msg['BKY_BALLOON_SHOUT'] = t.blocks.balloon_shout[0];
  Blockly.Msg['BKY_BALLOON_STOP'] = t.blocks.balloon_stop;
  Blockly.Msg['BKY_COND_EDGE'] = t.blocks.condition_touching_edge;
  Blockly.Msg['BKY_COND_MOUSE'] = t.blocks.condition_touching_mouse;
  Blockly.Msg['BKY_COND_KEY'] = t.blocks.condition_key_pressed[0];
  Blockly.Msg['BKY_COND_MOUSEDOWN'] = t.blocks.condition_mouse_down;

  Blockly.Msg['BKY_CATEGORY_LOGIC'] = t.categories.logic;
  Blockly.Msg['BKY_CATEGORY_ANIM'] = t.categories.animations;
  Blockly.Msg['BKY_CATEGORY_LOOKS'] = t.categories.looks;
  Blockly.Msg['BKY_CATEGORY_SOUND'] = t.categories.sound;
  Blockly.Msg['BKY_CATEGORY_BALLOON'] = t.categories.balloon;
  Blockly.Msg['BKY_CATEGORY_CALCOLATRICE'] = t.categories.calcolatrice;
  Blockly.Msg['BKY_CATEGORY_DATI'] = t.categories.dati;
  Blockly.Msg['BKY_BUTTON_ADD_EXTENSION'] = (t.ui as any).add_extension || 'Aggiungi estensione...';
  Blockly.Msg['BKY_MATH_ARITHMETIC'] = (t.blocks as any).math_arithmetic;
  Blockly.Msg['BKY_MATH_FUNCTIONS'] = (t.blocks as any).math_functions;
  Blockly.Msg['BKY_MATH_ROUND'] = (t.blocks as any).math_round;
  Blockly.Msg['BKY_MATH_MODULO_CURRENCY'] = (t.blocks as any).math_modulo_currency;
  Blockly.Msg['BKY_MATH_RANDOM'] = (t.blocks as any).math_random;
  Blockly.Msg['BKY_MATH_CONVERT'] = (t.blocks as any).math_convert;
  Blockly.Msg['BKY_DATA_ADD_ITEM'] = (t.blocks as any).data_add_item;
  Blockly.Msg['BKY_DATA_REMOVE_ITEM'] = (t.blocks as any).data_remove_item;
  Blockly.Msg['BKY_DATA_GET_LIST_ITEMS'] = (t.blocks as any).data_get_list_items;
  Blockly.Msg['BKY_DATA_RENAME_ITEM'] = (t.blocks as any).data_rename_item;
  Blockly.Msg['BKY_DATA_MOVE_ITEM'] = (t.blocks as any).data_move_item;
  Blockly.Msg['BKY_DATA_ON_LIST_CHANGE'] = (t.blocks as any).data_on_list_change;
  Blockly.Msg['BKY_DATA_GET_ITEM_NAME_BY_ID'] = (t.blocks as any).data_get_item_name_by_id;
  Blockly.Msg['BKY_DATA_GET_ITEM_ID_BY_NAME'] = (t.blocks as any).data_get_item_id_by_name;
  Blockly.Msg['BKY_WEB_REQUEST_GET'] = (t.blocks as any).web_request_get || "GET URL";
  Blockly.Msg['BKY_WEB_REQUEST_GET_JSON'] = (t.blocks as any).web_request_get_json || "GET JSON URL";
  Blockly.Msg['BKY_WEB_REQUEST_POST'] = (t.blocks as any).web_request_post || "POST URL";
  Blockly.Msg['BKY_WEB_WITH_BODY'] = (t.blocks as any).web_with_body || "con body";
  Blockly.Msg['BKY_WEB_REQUEST_PUT'] = (t.blocks as any).web_request_put || "PUT URL";
  Blockly.Msg['BKY_WEB_REQUEST_DELETE'] = (t.blocks as any).web_request_delete || "DELETE URL";
  Blockly.Msg['BKY_WEB_HEADER_SET'] = (t.blocks as any).web_header_set || "imposta header";
  Blockly.Msg['BKY_WEB_HEADER_SET_TO'] = (t.blocks as any).web_header_set_to || "a";
  Blockly.Msg['BKY_WEB_HEADER_CLEAR'] = (t.blocks as any).web_header_clear || "pulisci headers";
  Blockly.Msg['BKY_WEB_RESPONSE_STATUS'] = (t.blocks as any).web_response_status || "status code ultima risposta";
  Blockly.Msg['BKY_WEB_RESPONSE_OK'] = (t.blocks as any).web_response_ok || "ultima richiesta completata?";
  Blockly.Msg['BKY_WEB_RESPONSE_HEADER'] = (t.blocks as any).web_response_header || "header della risposta";
  Blockly.Msg['BKY_WEB_FETCH_IMAGE'] = (t.blocks as any).web_fetch_image || "scarica immagine da URL";
  Blockly.Msg['BKY_WEB_URL_ENCODE'] = (t.blocks as any).web_url_encode || "codifica URL";
  Blockly.Msg['BKY_WEB_URL_DECODE'] = (t.blocks as any).web_url_decode || "decodifica URL";
  Blockly.Msg['BKY_WEB_JSON_PARSE'] = (t.blocks as any).web_json_parse || "estrai";
  Blockly.Msg['BKY_WEB_JSON_PARSE_FROM'] = (t.blocks as any).web_json_parse_from || "da JSON";
  Blockly.Msg['BKY_WEB_REDIRECT'] = (t.blocks as any).web_redirect || "reindirizza utente a";
  Blockly.Msg['BKY_CATEGORY_WEB'] = (t.categories as any).web || "Richieste Web";

};
