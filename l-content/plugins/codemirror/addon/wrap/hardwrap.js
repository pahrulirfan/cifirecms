(function(k){"object"==typeof exports&&"object"==typeof module?k(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],k):k(CodeMirror)})(function(k){function p(c,a,b){for(var e=b.paragraphStart||c.getHelper(a,"paragraphStart"),d=a.line,f=c.firstLine();d>f;--d){var g=c.getLine(d);if(e&&e.test(g))break;if(!/\S/.test(g)){++d;break}}b=b.paragraphEnd||c.getHelper(a,"paragraphEnd");a=a.line+1;for(e=c.lastLine();a<=e;++a){g=c.getLine(a);if(b&&b.test(g)){++a;break}if(!/\S/.test(g))break}return{from:d,to:a}}function v(c,a,b,e){for(var d=a;d<c.length&&" "==c.charAt(d);)d++;for(;0<d&&!b.test(c.slice(d-1,d+1));--d);for(b=!0;;b=!1){var f=d;if(e)for(;" "==c.charAt(f-1);)--f;if(0==f&&b)d=a;else return{from:f,to:d}}}function n(c,a,b,e){a=c.clipPos(a);b=c.clipPos(b);var d=e.column||80,f=e.wrapOn||/\s\S|-[^\.\d]/;e=!1!==e.killTrailingSpace;var g=[],h="",q=a.line;a=c.getRange(a,b,!1);if(!a.length)return null;b=a[0].match(/^[ \t]*/)[0];b.length>=d&&(d=b.length+1);for(var r=0;r<a.length;++r){var l=a[r],n=h.length,p=0;h&&l&&!f.test(h.charAt(h.length-1)+l.charAt(0))&&(h+=" ",p=1);var t="";r&&(t=l.match(/^\s*/)[0],l=l.slice(t.length));h+=l;if(r){var u=h.length>d&&b==t&&v(h,d,f,e);u&&u.from==n&&u.to==n+p?(h=b+l,++q):g.push({text:[p?" ":""],from:m(q,n),to:m(q+1,t.length)})}for(;h.length>d;)l=v(h,d,f,e),g.push({text:["",b],from:m(q,l.from),to:m(q,l.to)}),h=b+h.slice(l.to),++q}g.length&&c.operation(function(){for(var b=0;b<g.length;++b){var a=g[b];(a.text||k.cmpPos(a.from,a.to))&&c.replaceRange(a.text,a.from,a.to)}});return g.length?{from:g[0].from,to:k.changeEnd(g[g.length-1])}:null}var m=k.Pos;k.defineExtension("wrapParagraph",function(c,a){a=a||{};c||(c=this.getCursor());var b=p(this,c,a);return n(this,m(b.from,0),m(b.to-1),a)});k.commands.wrapLines=function(c){c.operation(function(){for(var a,b,e=c.listSelections(),d=c.lastLine()+1,f=e.length-1;0<=f;f--)b=e[f],b.empty()?(b=p(c,b.head,{}),a=m(b.from,0),b=m(b.to-1)):(a=b.from(),b=b.to()),b.line>=d||(d=a.line,n(c,a,b,{}))})};k.defineExtension("wrapRange",function(c,a,b){return n(this,c,a,b||{})});k.defineExtension("wrapParagraphsInRange",function(c,a,b){b=b||{};var e=this,d=[];for(c=c.line;c<=a.line;)c=p(e,m(c,0),b),d.push(c),c=c.to;var f=!1;d.length&&e.operation(function(){for(var a=d.length-1;0<=a;--a)f=f||n(e,m(d[a].from,0),m(d[a].to-1),b)});return f})});