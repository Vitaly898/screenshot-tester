export type Transform = { x: number; y: number; scale: number };
export function dragDelta(dx:number,dy:number,zoom:number) { return {x:dx/zoom,y:dy/zoom}; }
export function comparePixels(a:Uint8ClampedArray,b:Uint8ClampedArray,coverage:Uint8Array,threshold:number) {
 const total=a.length/4; let changed=0; const pixels=new Uint8ClampedArray(a.length);
 for(let p=0;p<total;p++) { const i=p*4; const mismatch=!coverage[p] || Math.max(...[0,1,2,3].map(c=>Math.abs(a[i+c]-b[i+c])))>threshold;
 if(mismatch) changed++;
 const gray=Math.round((a[i]+a[i+1]+a[i+2])/3)*0.32;
 pixels.set(mismatch?[250,80,116,255]:[gray,gray,gray,255],i);
 }
 return {changed,total,percent:total?changed/total*100:0,pixels};
}
