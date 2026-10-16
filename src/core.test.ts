import { describe, it, expect } from 'vitest';
import { dragDelta, comparePixels } from './core';
describe('pixel comparison',()=>{
 it('counts missing coverage even when both pixels are transparent',()=>{
 const r=comparePixels(new Uint8ClampedArray(8),new Uint8ClampedArray(8),new Uint8Array([1,0]),0);
 expect(r.changed).toBe(1); expect(r.percent).toBe(50); expect(r.total).toBe(2);
 });
 it('uses strict maximum RGBA channel threshold',()=>{
 const a=new Uint8ClampedArray([10,20,30,255,0,0,0,255]);
 const b=new Uint8ClampedArray([15,20,30,255,0,0,0,200]);
 expect(comparePixels(a,b,new Uint8Array([1,1]),5).changed).toBe(1);
 expect(comparePixels(a,a,new Uint8Array([1,1]),0).changed).toBe(0);
 });
});
describe('reference-space geometry',()=>{
 it('converts screen movement to reference pixels without changing aspect ratio',()=>{
 expect(dragDelta(40,-20,0.5)).toEqual({x:80,y:-40});
 });
});
