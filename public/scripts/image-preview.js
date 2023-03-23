const iamgePicker = document.querySelector('#image-upload-control input');
const imagePreview = document.querySelector('#image-upload-control img');

function updateImagePreview() {
  const files = iamgePicker.files;

  if (!files || files.length == 0) {
    imagePreview.style.display = 'none';
    return;
  }

  const pickedFile = files[0];
  imagePreview.src = URL.createObjectURL(pickedFile);
  imagePreview.style.display ='block';
}

iamgePicker.addEventListener('change', updateImagePreview);
