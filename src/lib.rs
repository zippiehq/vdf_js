use neon::prelude::*;

extern crate vdf;
use vdf::{VDFParams, WesolowskiVDFParams, VDF};
use neon::types::buffer::TypedArray;

fn copy_slice(dst: &mut [u8], src: &[u8]) -> usize {
    let mut c = 0;
    for (d, s) in dst.iter_mut().zip(src.iter()) {
        *d = *s;
        c += 1;
    }
    c 
}

fn vdf_prove_wesolowski(mut cx: FunctionContext) -> JsResult<JsArrayBuffer> {
    let challenge: Handle<JsTypedArray<u8>> = cx.argument(0)?;
    let iterations: Handle<JsNumber> = cx.argument(1)?;

    let rs_iterations = iterations.value(&mut cx) as u64;
    let rs_challenge = challenge.as_slice(&cx) as &[u8];

    // The length of the prime numbers generated, in bits.
    let num_bits: u16 = 2048;

    // An instance of the VDF.  Instances can be used arbitrarily many times.
    let wesolowski_vdf = WesolowskiVDFParams(num_bits).new();

    let buffer = &wesolowski_vdf.solve(rs_challenge, rs_iterations).unwrap()[..];

    let mut buf = JsArrayBuffer::new(&mut cx, buffer.len() as usize)?;

    let slice = buf.as_mut_slice(&mut cx);
    
    copy_slice(slice, buffer);

    return Ok(buf);
}

fn vdf_verify_wesolowski(mut cx:FunctionContext) -> JsResult<JsBoolean> {
    let challenge: Handle<JsTypedArray<u8>> = cx.argument(0)?;
    let iterations: Handle<JsNumber> = cx.argument(1)?;
    let proof: Handle<JsTypedArray<u8>> = cx.argument(2)?;

    let rs_iterations = iterations.value(&mut cx) as u64;
    let rs_challenge = challenge.as_slice(&cx) as &[u8];
    let rs_proof = proof.as_slice(&cx) as &[u8];
    
    let num_bits: u16 = 2048;

    let wesolowski_vdf = WesolowskiVDFParams(num_bits).new();

    let valid = wesolowski_vdf.verify(rs_challenge, rs_iterations, rs_proof).is_ok();
    
    Ok(cx.boolean(valid))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("vdfProveWesolowski", vdf_prove_wesolowski)?;
    cx.export_function("vdfVerifyWesolowski", vdf_verify_wesolowski)?;

    Ok(())
}