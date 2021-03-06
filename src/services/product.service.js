import http from "../http-common";

class productDataService {

  // Tam bo vi xai kieu phan trang paginition + search phia duoi
  getAll() {
    console.log('get all products here FE');
    return http.get("/products");
  }

  getAllPerPage(currentPage,search_keyword,search_retail, search_category,usvn_longtieng) {
    console.log('get all products here limit ' + search_retail) ;
    return http.get(`/productsperpage/${currentPage}?search_keyword=${search_keyword}&search_retail=${search_retail}&search_category=${search_category}&usvn_longtieng=${usvn_longtieng}`);
  }

  // getAllPerCategoryPage(currentPage,search_category) {
  //   console.log('get products by CAT here limit ' + currentPage) ;
  //   return http.get(`/productsperpage/${currentPage}?search_category=${search_category}`);
  // }

  get(products_id) {
    return http.get(`/products/${products_id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  update(products_id, data) {
    console.log('data in service:  ' + data);
    return http.put(`/products/${products_id}`, data);
  }

  delete(products_id) {
    return http.delete(`/products/${products_id}`);
  }

  // deleteAll() {
  //   return http.delete(`/products`);
  // }

  findByKeyword(search_keyword) {
    console.log('hi search name');
    return http.get(`/products?search_keyword=${search_keyword}`);
  }
}

export default new productDataService();