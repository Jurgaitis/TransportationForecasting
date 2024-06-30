extern crate wasm_bindgen;

use ndarray::{Array, Array2};
use wasm_bindgen::prelude::*;

mod entropy_model;

// use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct Result {
    array: Vec<f64>,
    ndim: usize
}

#[wasm_bindgen]
impl Result {
    #[wasm_bindgen(getter)]
    pub fn ndim(&self) -> usize {
        self.ndim
    }

    #[wasm_bindgen(getter)]
    pub fn array(&self) -> Vec<f64> {
        self.array.clone()
    }
}

#[wasm_bindgen]
pub fn compute_model(productions: Vec<f64>, attractions: Vec<f64>, cost_matrix: Vec<f64>, ndim: usize) -> Result {
    let mut _productions = Array::from_vec(productions);
    let mut _attractions = Array::from_vec(attractions);
    let _cost_matrix = Array2::from_shape_vec((ndim, ndim), cost_matrix).unwrap();
    let peoples = _productions.sum();

    _productions /= peoples;
    _attractions /= peoples;
    
    let (corr, _, _) = entropy_model::sinkhorn(&_productions, &_attractions, &_cost_matrix, 25000, 1e-8, peoples as i32);

    Result {array: corr.into_raw_vec(), ndim}
}