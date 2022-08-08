/* buat action dispatcher */
import axios from "axios";

export const GET_LIST_EXPANSES = 'GET_LIST_EXPANSES';
export const ADD_EXPANSES = 'ADD_EXPANSES';

export const getListExpanses = () => {
  return (dispatch) => {
    /* loading */
    dispatch({
      type: GET_LIST_EXPANSES,
      payload: {
        loading: true,
        data: false,
        errorMessage: false
      }
    });

    /* get API */
    axios({
      method: 'GET',
      url: 'http://localhost:3000/items',
      timeout: 120000
    }).then(({data}) => {
      /* berhasil get api */
      data.sort(function (a, b) {
        return a.tanggal.localeCompare(b.tanggal) || new Date(a.jam) - new Date(b.jam); ;
      });
      
      let helper = {}
      let result = data.reduce((r, el) => {
        let e = el.tanggal;
        if (!helper[e]) {
          helper[e] = {
            id : el.id,
            tanggal: el.tanggal,
            summary: [],
            total : 0
          }
          r.push(helper[e]);
        }
        helper[e].summary.push({jam : el.jam, nama : el.nama, pengeluaran : el.pengeluaran});
        helper[e].total += el.pengeluaran
        return r;
      }, [])
      
      data = result
      console.log(data)

      dispatch({  
        type: GET_LIST_EXPANSES, 
        payload: {
          loading: false,
          data,
          errorMessage: false
        }
      });
    }).catch(err => {
      /* gagal get api */
      dispatch({
        type: GET_LIST_EXPANSES,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message
        }
      });
    })
  }
}

export const addExpanses = (data) => {
  return (dispatch) => {
    /* loading */
    dispatch({
      type: ADD_EXPANSES,
      payload: {
        loading: true,
        data: false,
        errorMessage: false
      }
    });

    /* post API */
    axios({
      method: 'POST',
      url: 'http://localhost:3000/items',
      timeout: 120000,
      data
    }).then(({data}) => {
      dispatch({
        type: ADD_EXPANSES, 
        payload: {
          loading: false,
          data,
          errorMessage: false
        }
      });
    }).catch(err => {
      /* gagal get api */
      dispatch({
        type: ADD_EXPANSES,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message
        }
      });
    })
  }
}