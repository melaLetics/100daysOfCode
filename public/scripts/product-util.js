const deleteProductBtns = document.querySelectorAll('.product-item button');

async function deleteProduct(event){
  const btn = event.target;
  const productId = btn.dataset.productid;
  const csrfToken = btn.dataset.csrf;

  const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
    method: 'DELETE',
  });

  if (!response.ok){
    alert('Something went wrong');
    return;
  }

  btn.parentElement.parentElement.parentElement.parentElement.remove();

}

for (const deleteButton of deleteProductBtns){
  deleteButton.addEventListener('click', deleteProduct);
}
