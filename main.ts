import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const T="#4d')-.2eeeeeeee,,,,,,,(,,,(,,,e,,,eeeeeeeeeeeeeCGGC#eeeeeeeeeee(+eeeeeeeeeeeeee''$'";
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,q){
const n=p.length,D=new Int32Array(256);let sp=0;
const C=new Int32Array(64);let cp=0;
const M=new Int32Array(256),out=[];
let ip=0,pc=0,st=0;
const done=c=>[out,c];
for(;;){
if(st===1e6)return done(10);
if(pc<0||pc>=n)return done(9);
const op=p[pc],c=T.charCodeAt(op)-35;
if(!(c<=65))return done(5);
const im=c>>4,ps=(c>>2)&3,ph=c&3;
if(pc+im>=n)return done(9);
st++;
const nx=pc+1+im;
if(sp<ps)return done(2);
if(sp-ps+ph>256)return done(3);
pc=nx;
if(op===0)return done(0);
else if(op===1)D[sp++]=(p[nx-1]<<24)>>24;
else if(op===2)D[sp++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);
else if(op===3)sp--;
else if(op===4){D[sp]=D[sp-1];sp++;}
else if(op===5){const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;}
else if(op===6){D[sp]=D[sp-2];sp++;}
else if(op===7){const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;}
else if(op===23)D[sp-1]=-D[sp-1]|0;
else if(op===27)D[sp-1]=~D[sp-1];
else if(op>=16&&op<=34){
const b=D[sp-1],a=D[sp-2];
if(op>18&&op<23&&!b)return done(4);
const r=op===16?(a+b)|0:op===17?(a-b)|0:op===18?Math.imul(a,b):op===19?(a/b)|0:op===20?(a%b)|0:op===21?((a>>>0)/(b>>>0))|0:op===22?((a>>>0)%(b>>>0))|0:op===24?a&b:op===25?a|b:op===26?a^b:op===28?a<<(b&31):op===29?a>>(b&31):op===30?(a>>>(b&31))|0:op===32?a===b?1:0:op===33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
sp-=2;D[sp++]=r;
}
else if(op>=48&&op<=50){
const rel=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;
let t=1;
if(op!==48){const v=D[--sp];t=op===49?v===0:v!==0;}
if(t)pc=nx+rel;
}
else if(op===51){
if(cp===64)return done(7);
C[cp++]=nx;pc=p[nx-2]|(p[nx-1]<<8);
}
else if(op===52){
if(cp===0)return done(8);
pc=C[--cp];
}
else if(op===64){
const a=D[sp-1];
if(a<0||a>=256)return done(6);
D[sp-1]=M[a];
}
else if(op===65){
const a=D[sp-1],v=D[sp-2];
if(a<0||a>=256)return done(6);
sp-=2;M[a]=v;
}
else if(op===80){
const s=String(D[sp-1]);
if(out.length+s.length>65536)return done(11);
sp--;
for(const ch of s)out.push(ch.charCodeAt(0));
}
else if(op===81){
if(out.length>=65536)return done(11);
out.push(D[--sp]&255);
}
else if(op===82)D[sp++]=ip<q.length?q[ip++]:-1;
else if(op===83)return done(D[--sp]&255);
}
}
for(const id of readdirSync(I).sort()){
const[o,c]=run(readFileSync(I+'/'+id+'/program.bin'),readFileSync(I+'/'+id+'/input.bin'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/stdout.bin',Uint8Array.from(o));
writeFileSync(O+'/'+id+'/exit.txt',c+'\n');
}
