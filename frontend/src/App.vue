<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">Gestión de Productos</h2>

    <!-- Componente lista -->
    <ProductList
      @new="openModal()"
      @edit="openModal($event)"
      ref="productList"
    />

    <!-- Modal de formulario -->
    <div class="modal fade" id="productModal" tabindex="-1" ref="modalEl">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ productToEdit ? 'Editar producto' : 'Nuevo producto' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ProductForm
              :productToEdit="productToEdit"
              @saved="handleSaved"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import * as bootstrap from 'bootstrap'

const productToEdit = ref(null)
const modalEl = ref(null)
let modalInstance = null
const productList = ref(null)

onMounted(() => {
  modalInstance = new bootstrap.Modal(modalEl.value)
})

function openModal(product = null) {
  productToEdit.value = product
  modalInstance.show()
}

function handleSaved() {
  modalInstance.hide()
  productList.value.loadProducts()
  productToEdit.value = null
}
</script>
