import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import * as It from 'blockly/msg/it';

Blockly.setLocale(It as any);

// --- 1. LOGICA (Rosso #EF4444) ---

Blockly.Blocks['logic_on_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_ON_START'] || "🚩 all'avvio");
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("All'avvio: Esegue tutti i blocchi sottostanti quando viene premuto il tasto Avvia (Bandiera Verde).");
  }
};

Blockly.Blocks['logic_wait_ms'] = {
  init: function() {
    this.appendValueInput("MS")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_LOGIC_WAIT_MS_0'] || "attendi");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_WAIT_MS_1'] || "millisecondi");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Attendi: Mette in pausa l'esecuzione dello script per il numero specificato di millisecondi (es. 1000 ms = 1 secondo).");
  }
};

Blockly.Blocks['logic_if_switch'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_0'] || "se");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'] || "è")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'], "TRUE"], [Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'], "FALSE"]]), "IS_TRUE")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'] || "allora");
    this.appendStatementInput("DO")
        .appendField("");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Se allora: Controlla se la condizione collegata è Vera o Falsa; se corrisponde allo switch, esegue i blocchi interni.");
  }
};

Blockly.Blocks['logic_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_FOREVER'] || "🔁 per sempre");
    this.appendStatementInput("DO")
        .appendField("");
    this.setPreviousStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Per sempre: Ripete continuamente e all'infinito i blocchi inseriti all'interno fino all'arresto del programma.");
  }
};

Blockly.Blocks['logic_when'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField(Blockly.Msg['BKY_LOGIC_WHEN'] || "⚡ quando");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Quando: Si attiva ed esegue i blocchi sottostanti non appena la condizione specificata diventa vera.");
  }
};

Blockly.Blocks['event_when_sprite_clicked'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_EVENT_CLICKED'] || "quando clicco su sto sprite");
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Quando si clicca su sto sprite: Esegue i blocchi sottostanti quando lo sprite viene cliccato.");
  }
};

Blockly.Blocks['logic_send_script'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_0'] || "📨 manda script a")
        .appendField(new Blockly.FieldDropdown(() => {
          const options: [string, string][] = [["Tutti gli sprite", "all"]];
          const sprites = (window as any).__PROJECT_SPRITES;
          if (sprites && Array.isArray(sprites)) {
            sprites.forEach(sprite => {
              options.push([sprite.name, sprite.name]);
            });
          }
          return options.length > 0 ? options : [["Nessuno", "none"]];
        }), "TARGET_SPRITE");
    this.appendStatementInput("SCRIPT")
        .appendField(Blockly.Msg['BKY_LOGIC_SEND_SCRIPT_1'] || "script:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Manda script a: Invia ed esegue il ramo di blocchi collegati direttamente sullo sprite target selezionato o su tutti.");
  }
};

Blockly.Blocks['logic_control_script'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg['BKY_LOGIC_CONTROL_0'], "STOP"],
          [Blockly.Msg['BKY_LOGIC_CONTROL_1'], "PAUSE"],
          [Blockly.Msg['BKY_LOGIC_CONTROL_2'], "START"]
        ]), "ACTION")
        .appendField(Blockly.Msg['BKY_LOGIC_CONTROL_3'] || "script");
    this.appendStatementInput("SCRIPT")
        .appendField("");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Controllo script: Permette di fermare, mettere in pausa o avviare il blocco di codice specificato.");
  }
};

Blockly.Blocks['logic_if_multi_switch'] = {
  init: function() {
    this.appendValueInput("COND1")
        .setCheck("Boolean")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_0'] || "se");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'] || "è")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'], "TRUE"], [Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'], "FALSE"]]), "IS_TRUE1")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'] || "allora");
    this.appendStatementInput("DO1");

    this.appendValueInput("COND2")
        .setCheck("Boolean")
        .appendField("altrimenti se");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'] || "è")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'], "TRUE"], [Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'], "FALSE"]]), "IS_TRUE2")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'] || "allora");
    this.appendStatementInput("DO2");

    this.appendValueInput("COND3")
        .setCheck("Boolean")
        .appendField("altrimenti se");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_1'] || "è")
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg['BKY_LOGIC_IF_SWITCH_3'], "TRUE"], [Blockly.Msg['BKY_LOGIC_IF_SWITCH_4'], "FALSE"]]), "IS_TRUE3")
        .appendField(Blockly.Msg['BKY_LOGIC_IF_SWITCH_2'] || "allora");
    this.appendStatementInput("DO3");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EF4444');
    this.setTooltip("Se / Altrimenti Se multiplo: Valuta in sequenza 3 diverse condizioni con interruttore vero/falso ed esegue il primo ramo soddisfatto.");
  }
};

// --- 2. ANIMAZIONI (Arancione #F97316) ---

Blockly.Blocks['anim_move_steps'] = {
  init: function() {
    this.appendValueInput("STEPS")
        .setCheck("Number")
        .appendField("avanza di");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_ANIM_MOVE_1'] || "passi");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Avanza di passi: Sposta lo sprite in avanti nella direzione in cui è orientato del numero di passi specificato.");
  }
};

Blockly.Blocks['anim_rotate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ruota in senso")
        .appendField(new Blockly.FieldDropdown([["orario ↻", "CW"], ["antiorario ↺", "CCW"]]), "DIRECTION")
        .appendField("di");
    this.appendValueInput("DEGREES")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_ANIM_ROTATE_1'] || "gradi");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Ruota: Gira lo sprite in senso orario o antiorario del numero di gradi specificato.");
  }
};

Blockly.Blocks['anim_goto_xy'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_GOTO_0'] || "vai a X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_GOTO_1'] || "Y");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Vai a X Y: Posiziona istantaneamente lo sprite alle coordinate X (orizzontale) e Y (verticale) specificate.");
  }
};

Blockly.Blocks['anim_glide_xy'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_GLIDE_0'] || "scivola a X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_GOTO_1'] || "Y");
    this.appendValueInput("SECS")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_GLIDE_2'] || "in");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_SOUND_START_AT_2'] || "secondi");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Scivola a X Y: Fa muovere lo sprite con un'animazione fluida e graduale verso la posizione (X, Y) nella durata di tempo indicata.");
  }
};

Blockly.Blocks['anim_bounce_edge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_ANIM_BOUNCE'] || "rimbalza quando tocchi il bordo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Rimbalza quando tocchi il bordo: Se lo sprite tocca uno dei quattro bordi dello Stage, inverte la sua direzione di movimento.");
  }
};

Blockly.Blocks['anim_set_speed'] = {
  init: function() {
    this.appendValueInput("SPEED")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_ANIM_SPEED'] || "imposta velocità a");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F97316');
    this.setTooltip("Imposta velocità: Regola la velocità con cui vengono eseguiti i movimenti e i passi dello sprite.");
  }
};

// --- 3. ASPETTO (Giallo #EAB308) ---

Blockly.Blocks['looks_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOOKS_SHOW'] || "👁️ mostra");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Mostra: Rende lo sprite visibile sullo Stage.");
  }
};

Blockly.Blocks['looks_hide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOOKS_HIDE'] || "🙈 nascondi");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Nascondi: Rende lo sprite invisibile sullo Stage senza interrompere i suoi script.");
  }
};

Blockly.Blocks['looks_change_size'] = {
  init: function() {
    this.appendValueInput("CHANGE")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_LOOKS_CHANGE_SIZE'] || "cambia dimensione di");
    this.appendDummyInput()
        .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Cambia dimensione: Ingrandisce (con valori positivi) o rimpicciolisce (con valori negativi) lo sprite della percentuale indicata.");
  }
};

Blockly.Blocks['looks_reset_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOOKS_RESET_SIZE'] || "ripristina dimensione");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Ripristina dimensione: Riporta la dimensione dello sprite al suo valore originale (100%).");
  }
};

Blockly.Blocks['looks_change_effect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOOKS_CHANGE_EFFECT'] || "cambia effetto")
        .appendField(new Blockly.FieldDropdown([
          ["grayscale", "grayscale"],
          ["colore", "colore"],
          ["pixel", "pixel"],
          ["luminosità", "luminosità"],
          ["fantasma", "fantasma"]
        ]), "EFFECT")
        .appendField("di");
    this.appendValueInput("CHANGE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Cambia effetto: Applica un filtro visivo allo sprite (grayscale = bianco/nero, colore = tonalità, pixel = sfocatura, luminosità, fantasma = trasparenza).");
  }
};

Blockly.Blocks['looks_next_costume'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_LOOKS_NEXT_COSTUME'] || "👗 prossimo costume");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Prossimo costume: Passa al costume o variante grafica successiva dello sprite.");
  }
};

Blockly.Blocks['looks_goto_costume'] = {
  init: function() {
    this.appendValueInput("COSTUME")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_LOOKS_GOTO_COSTUME'] || "vai al costume");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EAB308');
    this.setTooltip("Vai al costume: Imposta direttamente il costume dello sprite al numero specificato.");
  }
};

// --- 4. SUONO (Verde #10B981) ---

const getSoundOptions = (): [string, string][] => {
  const sounds = (window as any).__SOUND_LIST || [];
  if (sounds.length === 0) return [["Nessun suono", "none"]];
  return sounds.map((s: string) => [s.replace(/\.[^/.]+$/, ""), s]);
};

Blockly.Blocks['sound_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_SOUND_START'] || "🔊 avvia suono")
        .appendField(new Blockly.FieldDropdown(getSoundOptions), "SOUND");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981');
    this.setTooltip("Avvia suono: Riproduce immediatamente l'effetto sonoro selezionato tra quelli disponibili.");
  }
};

Blockly.Blocks['sound_start_at_secs'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_SOUND_START'] || "🔊 avvia suono")
        .appendField(new Blockly.FieldDropdown(getSoundOptions), "SOUND")
        .appendField(Blockly.Msg['BKY_SOUND_START_AT_1'] || "a");
    this.appendValueInput("SECS")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_SOUND_START_AT_2'] || "secondi");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981');
    this.setTooltip("Avvia suono a secondi: Attende il tempo indicato in secondi e poi riproduce il suono selezionato.");
  }
};

Blockly.Blocks['sound_change_volume'] = {
  init: function() {
    this.appendValueInput("CHANGE")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_SOUND_VOLUME'] || "cambia volume di");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981');
    this.setTooltip("Cambia volume: Aumenta o diminuisce il livello del volume sonoro.");
  }
};

Blockly.Blocks['sound_set_hz'] = {
  init: function() {
    this.appendValueInput("HZ")
        .setCheck("Number")
        .appendField(Blockly.Msg['BKY_SOUND_SET_HZ'] || "imposta frequenza (hz) a");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981');
    this.setTooltip("Imposta frequenza: Imposta la frequenza del generatore di suoni (in Hz).");
  }
};

Blockly.Blocks['sound_stop_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_SOUND_STOP_ALL'] || "⏹️ ferma tutti i suoni");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#10B981');
    this.setTooltip("Ferma tutti i suoni: Interrompe immediatamente qualsiasi effetto sonoro in riproduzione.");
  }
};

// --- 5. BALOON (Azzurro #0EA5E9) ---

Blockly.Blocks['balloon_say'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(Blockly.Msg['BKY_BALLOON_SAY'] || "dire");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0EA5E9');
    this.setTooltip("Mostra un fumetto parlato sopra lo sprite.");
  }
};

Blockly.Blocks['balloon_think'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(Blockly.Msg['BKY_BALLOON_THINK'] || "pensa");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0EA5E9');
    this.setTooltip("Mostra un fumetto di pensiero sopra lo sprite.");
  }
};

Blockly.Blocks['balloon_shout'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .appendField(Blockly.Msg['BKY_BALLOON_SHOUT'] || "grida");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0EA5E9');
    this.setTooltip("Mostra un fumetto urlato sopra lo sprite.");
  }
};

Blockly.Blocks['balloon_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_BALLOON_STOP'] || "smetti di parlare");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#0EA5E9');
    this.setTooltip("Rimuove il fumetto dallo sprite.");
  }
};

// --- 6. CALCOLATRICE (Viola #A855F7) ---

Blockly.Blocks['math_arithmetic'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["%", "%"]]), "OP");
    this.appendValueInput("B")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Operazioni aritmetiche");
  }
};

Blockly.Blocks['math_functions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["radice quadrata", "sqrt"],
          ["valore assoluto", "abs"],
          ["cos", "cos"],
          ["tan", "tan"]
        ]), "FUNC")
        .appendField("di");
    this.appendValueInput("NUM")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Funzioni matematiche");
  }
};

Blockly.Blocks['math_round'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Arrotonda");
    this.appendValueInput("NUM")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Arrotonda il numero");
  }
};

Blockly.Blocks['math_modulo_currency'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Resto totale di");
    this.appendValueInput("NUM")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["$", "$"], ["€", "€"], ["£", "£"], ["¥", "¥"], ["₷", "₷"], ["₿", "₿"]
        ]), "CURRENCY");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Resto totale con valuta");
  }
};

Blockly.Blocks['math_random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Numero a caso da");
    this.appendValueInput("MIN")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("a");
    this.appendValueInput("MAX")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Numero casuale tra due valori");
  }
};

Blockly.Blocks['math_convert'] = {
  init: function() {
    const units = [
      ["Hz", "Hz"], ["Byte", "Byte"], ["KIlobite", "KIlobite"], ["Khz", "Khz"], ["Mhz", "Mhz"], ["Nhz", "Nhz"],
      ["Secondi", "Secondi"], ["Minuti", "Minuti"], ["Anni", "Anni"], ["Ore", "Ore"], ["Secoli", "Secoli"]
    ];
    this.appendDummyInput()
        .appendField("Converti");
    this.appendValueInput("VAL")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(units), "FROM")
        .appendField("a")
        .appendField(new Blockly.FieldDropdown(units), "TO");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour('#A855F7');
    this.setTooltip("Conversione unità");
  }
};

// --- 7. DATI (Rosa #EC4899) ---

const getListOptions = (): [string, string][] => {
  const lists = (window as any).__PROJECT_LISTS || [];
  return lists.length > 0 ? lists.map((l: string) => [l, l]) : [["Nessuna lista", "none"]];
};

Blockly.Blocks['data_add_item'] = {
  init: function() {
    this.appendValueInput("NAME").setCheck("String").appendField("Aggiungi elemento");
    this.appendValueInput("ID").setCheck("String").appendField("con ID");
    this.appendDummyInput().appendField("alla lista").appendField(new Blockly.FieldDropdown(getListOptions), "LIST");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_remove_item'] = {
  init: function() {
    this.appendValueInput("ID").setCheck("String").appendField("Rimuovi elemento con ID");
    this.appendValueInput("NAME").setCheck("String").appendField("nome");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_get_list_items'] = {
  init: function() {
    this.appendDummyInput().appendField("Elenca gli articoli sulla lista").appendField(new Blockly.FieldDropdown(getListOptions), "LIST");
    this.setOutput(true, "Array");
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_rename_item'] = {
  init: function() {
    this.appendValueInput("OLD_NAME").setCheck("String").appendField("Cambia nome sull'articolo");
    this.appendValueInput("NEW_NAME").setCheck("String").appendField("a");
    this.appendValueInput("NEW_ID").setCheck("String").appendField("nuovo ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_move_item'] = {
  init: function() {
    this.appendValueInput("NAME").setCheck("String").appendField("Cambia posizione di");
    this.appendValueInput("POS").setCheck("Number").appendField("a");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_on_list_change'] = {
  init: function() {
    this.appendDummyInput().appendField("Quando").appendField(new Blockly.FieldDropdown(getListOptions), "LIST").appendField("cambia");
    this.setNextStatement(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_get_item_name_by_id'] = {
  init: function() {
    this.appendValueInput("ID").setCheck(null).appendField("Ottieni nome elemento con ID");
    this.appendDummyInput().appendField("dalla lista").appendField(new Blockly.FieldDropdown(getListOptions), "LIST");
    this.setOutput(true, null);
    this.setColour('#EC4899');
  }
};
Blockly.Blocks['data_get_item_id_by_name'] = {
  init: function() {
    this.appendValueInput("NAME").setCheck(null).appendField("Ottieni ID elemento con nome");
    this.appendDummyInput().appendField("dalla lista").appendField(new Blockly.FieldDropdown(getListOptions), "LIST");
    this.setOutput(true, null);
    this.setColour('#EC4899');
  }
};

// --- Condizioni & Sensori (Nascosti nel toolbox ma usati da altri blocchi) ---

Blockly.Blocks['condition_touching_edge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_COND_EDGE'] || "sta toccando il bordo?");
    this.setOutput(true, "Boolean");
    this.setColour('#3B82F6');
    this.setTooltip("Sta toccando il bordo?: Restituisce Vero se lo sprite tocca uno dei confini dello Stage, altrimenti Falso.");
  }
};

Blockly.Blocks['condition_touching_mouse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_COND_MOUSE'] || "sta toccando il puntatore del mouse?");
    this.setOutput(true, "Boolean");
    this.setColour('#3B82F6');
    this.setTooltip("Sta toccando il mouse?: Restituisce Vero se il cursore del mouse si trova sopra allo sprite.");
  }
};

Blockly.Blocks['condition_key_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_COND_KEY'] || "tasto")
        .appendField(new Blockly.FieldDropdown([
          ["spazio", "SPACE"],
          ["freccia su", "UP"],
          ["freccia giù", "DOWN"],
          ["freccia destra", "RIGHT"],
          ["freccia sinistra", "LEFT"],
          ["qualsiasi", "ANY"]
        ]), "KEY")
        .appendField("premuto?");
    this.setOutput(true, "Boolean");
    this.setColour('#3B82F6');
    this.setTooltip("Tasto premuto?: Restituisce Vero se il tasto selezionato della tastiera è attualmente premuto.");
  }
};

Blockly.Blocks['condition_mouse_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg['BKY_COND_MOUSEDOWN'] || "mouse cliccato?");
    this.setOutput(true, "Boolean");
    this.setColour('#3B82F6');
    this.setTooltip("Mouse cliccato?: Restituisce Vero mentre il pulsante del mouse viene tenuto premuto sullo schermo.");
  }
};


// --- ESTENSIONI: Richieste Web (Verde Scuro #065F46) ---
Blockly.Blocks['web_request_get'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REQUEST_GET"] || "GET URL");
    this.setOutput(true, "String");
    this.setColour('#065F46');
    this.setTooltip("Esegue una richiesta HTTP GET e restituisce il testo della risposta.");
  }
};
Blockly.Blocks['web_request_get_json'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REQUEST_GET_JSON"] || "GET JSON URL");
    this.setOutput(true, null);
    this.setColour('#065F46');
    this.setTooltip("Esegue una richiesta HTTP GET e restituisce la risposta come oggetto JSON.");
  }
};
Blockly.Blocks['web_request_post'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REQUEST_POST"] || "POST URL");
    this.appendValueInput("BODY")
        .setCheck(["String", "Object"])
        .appendField(Blockly.Msg["BKY_WEB_WITH_BODY"] || "con body");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_request_put'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REQUEST_PUT"] || "PUT URL");
    this.appendValueInput("BODY")
        .setCheck(["String", "Object"])
        .appendField(Blockly.Msg["BKY_WEB_WITH_BODY"] || "con body");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_request_delete'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REQUEST_DELETE"] || "DELETE URL");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_header_set'] = {
  init: function() {
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_HEADER_SET"] || "imposta header");
    this.appendValueInput("VALUE")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_HEADER_SET_TO"] || "a");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_header_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["BKY_WEB_HEADER_CLEAR"] || "pulisci headers");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_response_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["BKY_WEB_RESPONSE_STATUS"] || "status code ultima risposta");
    this.setOutput(true, "Number");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_response_ok'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["BKY_WEB_RESPONSE_OK"] || "ultima richiesta completata?");
    this.setOutput(true, "Boolean");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_response_header'] = {
  init: function() {
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_RESPONSE_HEADER"] || "header della risposta");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_fetch_image'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_FETCH_IMAGE"] || "scarica immagine da URL");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_url_encode'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_URL_ENCODE"] || "codifica URL");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_url_decode'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_URL_DECODE"] || "decodifica URL");
    this.setOutput(true, "String");
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_json_parse'] = {
  init: function() {
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_JSON_PARSE"] || "estrai");
    this.appendValueInput("JSON")
        .setCheck(["String", "Object"])
        .appendField(Blockly.Msg["BKY_WEB_JSON_PARSE_FROM"] || "da JSON");
    this.setOutput(true, null);
    this.setColour('#065F46');
  }
};
Blockly.Blocks['web_redirect'] = {
  init: function() {
    this.appendValueInput("URL")
        .setCheck("String")
        .appendField(Blockly.Msg["BKY_WEB_REDIRECT"] || "reindirizza utente a");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#065F46');
  }
};

// --- Toolbox Definition ---



// Register a custom toolbox item for the Add Extension button
class ExtensionButtonCategory extends Blockly.ToolboxCategory {
  constructor(categoryDef: any, toolbox: any, opt_parent: any) {
    super(categoryDef, toolbox, opt_parent);
  }
  
  override onClick(e: Event) {
    // Intercept click and fire the extension modal
    if (this.workspace_.getToolbox()) {
      const workspace = this.workspace_ as any;
      if (workspace.extensionCallback) {
        workspace.extensionCallback();
      }
    }
    // Do not call super, so it doesn't try to open a flyout
  }
}
Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, 'extension_button', ExtensionButtonCategory, true);

const getToolbox = (activeExtensions: string[] = []) => { 
  const toolbox: any = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_LOGIC'] || 'Logica',
      colour: '#EF4444',
      contents: [
        { kind: 'block', type: 'logic_on_start' },
        { kind: 'block', type: 'event_when_sprite_clicked' },
        { 
          kind: 'block', 
          type: 'logic_wait_ms',
          inputs: {
            MS: { shadow: { type: 'math_number', fields: { NUM: 1000 } } }
          }
        },
        { 
          kind: 'block', 
          type: 'logic_if_switch',
          inputs: {
            CONDITION: { block: { type: 'condition_touching_edge' } }
          }
        },
        { kind: 'block', type: 'logic_forever' },
        { 
          kind: 'block', 
          type: 'logic_when',
          inputs: {
            CONDITION: { block: { type: 'condition_key_pressed' } }
          }
        },
        { kind: 'block', type: 'logic_send_script' },
        { kind: 'block', type: 'logic_control_script' },
        { 
          kind: 'block', 
          type: 'logic_if_multi_switch',
          inputs: {
            COND1: { block: { type: 'condition_touching_edge' } },
            COND2: { block: { type: 'condition_mouse_down' } },
            COND3: { block: { type: 'condition_key_pressed' } }
          }
        }
      ],
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_ANIM'] || 'Animazioni',
      colour: '#F97316',
      contents: [
        { 
          kind: 'block', 
          type: 'anim_move_steps',
          inputs: {
            STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { 
          kind: 'block', 
          type: 'anim_rotate',
          inputs: {
            DEGREES: { shadow: { type: 'math_number', fields: { NUM: 5 } } }
          }
        },
        { 
          kind: 'block', 
          type: 'anim_goto_xy',
          inputs: {
            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },
        { 
          kind: 'block', 
          type: 'anim_glide_xy',
          inputs: {
            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            SECS: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'anim_bounce_edge' },
        { 
          kind: 'block', 
          type: 'anim_set_speed',
          inputs: {
            SPEED: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        }
      ],
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_LOOKS'] || 'Aspetto',
      colour: '#EAB308',
      contents: [
        { kind: 'block', type: 'looks_show' },
        { kind: 'block', type: 'looks_hide' },
        { 
          kind: 'block', 
          type: 'looks_change_size',
          inputs: {
            CHANGE: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'looks_reset_size' },
        { 
          kind: 'block', 
          type: 'looks_change_effect',
          inputs: {
            CHANGE: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'looks_next_costume' },
        { 
          kind: 'block', 
          type: 'looks_goto_costume',
          inputs: {
            COSTUME: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        }
      ],
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_SOUND'] || 'Suono',
      colour: '#10B981',
      contents: [
        { kind: 'block', type: 'sound_start' },
        { 
          kind: 'block', 
          type: 'sound_start_at_secs',
          inputs: {
            SECS: { shadow: { type: 'math_number', fields: { NUM: 5 } } }
          }
        },
        { 
          kind: 'block', 
          type: 'sound_change_volume',
          inputs: {
            CHANGE: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
        { kind: 'block', type: 'sound_stop_all' },
        { 
          kind: 'block', 
          type: 'sound_set_hz',
          inputs: {
            HZ: { shadow: { type: 'math_number', fields: { NUM: 1000 } } }
          }
        }
      ],
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_BALLOON'] || 'Baloon',
      colour: '#0EA5E9',
      contents: [
        { 
          kind: 'block', 
          type: 'balloon_say',
          inputs: {
            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Ciao!' } } }
          }
        },
        { 
          kind: 'block', 
          type: 'balloon_think',
          inputs: {
            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Potrei fare così...' } } }
          }
        },
        { 
          kind: 'block', 
          type: 'balloon_shout',
          inputs: {
            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Aaaaaaah!' } } }
          }
        },
        { kind: 'block', type: 'balloon_stop' }
      ],
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_CALCOLATRICE'] || 'Calcolatrice',
      colour: '#A855F7',
      contents: [
        { kind: 'block', type: 'math_arithmetic', inputs: { A: { shadow: { type: 'math_number', fields: { NUM: 1 } } }, B: { shadow: { type: 'math_number', fields: { NUM: 1 } } } } },
        { kind: 'block', type: 'math_functions', inputs: { NUM: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'math_round', inputs: { NUM: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'math_modulo_currency', inputs: { NUM: { shadow: { type: 'math_number', fields: { NUM: 40 } } } } },
        { kind: 'block', type: 'math_random', inputs: { MIN: { shadow: { type: 'math_number', fields: { NUM: 1 } } }, MAX: { shadow: { type: 'math_number', fields: { NUM: 1000 } } } } },
        { kind: 'block', type: 'math_convert', inputs: { VAL: { shadow: { type: 'math_number', fields: { NUM: 300 } } } } }
      ]
    },
    {
      kind: 'category',
      name: Blockly.Msg['BKY_CATEGORY_DATI'] || 'Dati',
      colour: '#EC4899',
      contents: [
        { kind: 'block', type: 'data_add_item' },
        { kind: 'block', type: 'data_remove_item' },
        { kind: 'block', type: 'data_get_list_items' },
        { kind: 'block', type: 'data_rename_item' },
        { kind: 'block', type: 'data_move_item' },
        { kind: 'block', type: 'data_on_list_change' },
        { kind: 'block', type: 'data_get_item_name_by_id' },
        { kind: 'block', type: 'data_get_item_id_by_name' }
      ]
    }
  ]
}; // End of toolbox

  if (activeExtensions.includes("web_requests")) {
    toolbox.contents.push({
      kind: "category",
      name: Blockly.Msg["BKY_CATEGORY_WEB"] || "Richieste Web",
      colour: "#065F46",
      contents: [
        { kind: "block", type: "web_request_get", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://api.github.com/users/miciocode" } } } } },
        { kind: "block", type: "web_request_get_json", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://api.github.com/users/miciocode" } } } } },
        { kind: "block", type: "web_request_post", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://httpbin.org/post" } } }, BODY: { shadow: { type: "text", fields: { TEXT: "{ \"ciao\": \"mondo\" }" } } } } },
        { kind: "block", type: "web_request_put", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://httpbin.org/put" } } }, BODY: { shadow: { type: "text", fields: { TEXT: "{ \"ciao\": \"mondo\" }" } } } } },
        { kind: "block", type: "web_request_delete", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://httpbin.org/delete" } } } } },
        { kind: "block", type: "web_header_set", inputs: { KEY: { shadow: { type: "text", fields: { TEXT: "Authorization" } } }, VALUE: { shadow: { type: "text", fields: { TEXT: "Bearer TOKEN" } } } } },
        { kind: "block", type: "web_header_clear" },
        { kind: "block", type: "web_response_status" },
        { kind: "block", type: "web_response_ok" },
        { kind: "block", type: "web_response_header", inputs: { KEY: { shadow: { type: "text", fields: { TEXT: "Content-Type" } } } } },
        { kind: "block", type: "web_fetch_image", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://scratch.mit.edu/favicon.ico" } } } } },
        { kind: "block", type: "web_url_encode", inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "ciao mondo!" } } } } },
        { kind: "block", type: "web_url_decode", inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "ciao%20mondo%21" } } } } },
        { kind: "block", type: "web_json_parse", inputs: { KEY: { shadow: { type: "text", fields: { TEXT: "name" } } }, JSON: { shadow: { type: "text", fields: { TEXT: "{ \"name\": \"Micio\" }" } } } } },
        { kind: "block", type: "web_redirect", inputs: { URL: { shadow: { type: "text", fields: { TEXT: "https://scratch.mit.edu" } } } } }
      ]
    });
  }



  return toolbox;
};


interface BlocklyWorkspaceProps {
  activeExtensions?: string[];
  onAddExtension?: (extId: string) => void;
  onWorkspaceChange: (workspace: Blockly.WorkspaceSvg | null) => void;
  onBlockClick?: (block: Blockly.Block) => void;
  initialXml?: string | null;
  language?: string;
  darkMode?: boolean;
  sprites?: any[];
}

const lightTheme = Blockly.Theme.defineTheme('custom_scratch_theme_light', {
  name: 'custom_scratch_theme_light',
  base: Blockly.Themes.Classic,
  startHats: true,
  blockStyles: {
    logic_blocks: { colourPrimary: '#EF4444' },
    loop_blocks: { colourPrimary: '#EF4444' },
    math_blocks: { colourPrimary: '#3B82F6' },
    text_blocks: { colourPrimary: '#3B82F6' }
  },
  categoryStyles: {
    logic_category: { colour: '#EF4444' }
  },
  componentStyles: {
    workspaceBackgroundColour: '#F9FAFB', // gray-50
    toolboxBackgroundColour: '#FFFFFF', // white
    toolboxForegroundColour: '#1F2937', // gray-800
    flyoutBackgroundColour: '#F3F4F6', // gray-100
    flyoutForegroundColour: '#1F2937',
    scrollbarColour: '#CBD5E1', // slate-300
    insertionMarkerColour: '#000000',
    insertionMarkerOpacity: 0.2,
    markerColour: '#000000',
    cursorColour: '#000000'
  }
});

const darkTheme = Blockly.Theme.defineTheme('custom_scratch_theme_dark', {
  name: 'custom_scratch_theme_dark',
  base: Blockly.Themes.Classic,
  startHats: true,
  blockStyles: {
    logic_blocks: { colourPrimary: '#EF4444' },
    loop_blocks: { colourPrimary: '#EF4444' },
    math_blocks: { colourPrimary: '#3B82F6' },
    text_blocks: { colourPrimary: '#3B82F6' }
  },
  categoryStyles: {
    logic_category: { colour: '#EF4444' }
  },
  componentStyles: {
    workspaceBackgroundColour: '#1F2937', // gray-800
    toolboxBackgroundColour: '#111827', // gray-900
    toolboxForegroundColour: '#F9FAFB', // gray-50
    flyoutBackgroundColour: '#374151', // gray-700
    flyoutForegroundColour: '#F9FAFB',
    scrollbarColour: '#4B5563', // gray-600
    insertionMarkerColour: '#FFFFFF',
    insertionMarkerOpacity: 0.2,
    markerColour: '#FFFFFF',
    cursorColour: '#FFFFFF'
  }
});

export const BlocklyEditor: React.FC<BlocklyWorkspaceProps> = ({ activeExtensions = [], onAddExtension, onWorkspaceChange, onBlockClick, initialXml, darkMode = false, language, sprites = [] }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    (window as any).__PROJECT_SPRITES = sprites;
    (window as any).__PROJECT_LISTS = (window as any).__PROJECT_LISTS || [];
    // Load sounds
    fetch("/api/sounds")
      .then(res => res.json())
      .then(data => {
        (window as any).__SOUND_LIST = data.sounds;
      })
      .catch(err => console.error("Error loading sounds:", err));
  }, [sprites]);

  
  // Update toolbox when active extensions or language change
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.updateToolbox(getToolbox(activeExtensions));
      // Force redraw of blocks to reflect new translations
      const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
      workspaceRef.current.clear();
      Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
    }
  }, [activeExtensions, language]);

  // Update theme when darkMode changes
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.setTheme(darkMode ? darkTheme : lightTheme);
    }
  }, [darkMode]);

  useEffect(() => {
    if (blocklyDiv.current && !workspaceRef.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: getToolbox(activeExtensions),
        renderer: 'zelos',
        theme: darkMode ? darkTheme : lightTheme,
        grid: {
          spacing: 20,
          length: 3,
          colour: '#E2E8F0',
          snap: true,
        },
        trashcan: true,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 0.85,
        }
      });

      if (initialXml) {
        try {
          const dom = Blockly.utils.xml.textToDom(initialXml);
          Blockly.Xml.domToWorkspace(dom, workspaceRef.current);
        } catch (e) {
          console.error("Error loading initial XML:", e);
        }
      }

      workspaceRef.current.addChangeListener((e: any) => {
        if (workspaceRef.current) {
          onWorkspaceChange(workspaceRef.current);
        }
        if (e && e.type === Blockly.Events.CLICK && e.blockId && onBlockClick && workspaceRef.current) {
          const clickedBlock = workspaceRef.current.getBlockById(e.blockId);
          if (clickedBlock) {
            onBlockClick(clickedBlock);
          }
        }
      });

      // Crucial: notify parent that workspace is ready
      onWorkspaceChange(workspaceRef.current);
    }

    return () => {
      if (workspaceRef.current) {
        const ws = workspaceRef.current;
        workspaceRef.current = null;
        onWorkspaceChange(null);
        setTimeout(() => {
          try {
            ws.dispose();
          } catch (e) {
            console.warn("Blockly dispose warning:", e);
          }
        }, 10);
      }
    };
  }, []);

  // Update initialXml changes if loading a new project or switching sprite
  useEffect(() => {
    if (workspaceRef.current && initialXml) {
      try {
        workspaceRef.current.clear();
        const dom = Blockly.utils.xml.textToDom(initialXml);
        Blockly.Xml.domToWorkspace(dom, workspaceRef.current);
      } catch (e) {
        console.error("Error updating XML:", e);
      }
    } else if (workspaceRef.current && initialXml === null) {
      workspaceRef.current.clear();
    }
  }, [initialXml]);

  return (
    <div className="flex-grow w-full h-full p-0 relative">

      

      <div 
        ref={blocklyDiv} 
        className="w-full h-full"
        style={{ minHeight: '520px' }}
      />
    </div>
  );
};
