"use strict";function _workingMap(array,cb){var retval=new Array(array.length);for(var i=0;i<retval.length;++i){retval[i]=cb(array[i]);}
return retval;}
function tarGetEntries(filename,array_buffer){var view=new Uint8Array(array_buffer);var offset=0;var entries=[];while(offset+512<view.byteLength){var entry_name=_workingMap(view.slice(offset+0,offset+0+100),String.fromCharCode);entry_name=entry_name.join('').replace(/\0/g,'');if(entry_name.length===0){break;}
var entry_length=parseInt(_workingMap(view.slice(offset+124,offset+124+12),String.fromCharCode).join(''),8);var entry={name:entry_name,length:entry_length,offset:offset};entries.push(entry);offset+=(entry_length+512);if(offset%512>0){var even=(offset/512)|0;offset=(even+1)*512;}}
return entries;}
function tarGetEntryData(entry,array_buffer){var view=new Uint8Array(array_buffer);var offset=entry.offset;var length=entry.length;var entry_data=view.slice(offset+512,offset+512+length);return entry_data;}