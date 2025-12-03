<template>
  <form @submit.prevent="saveProduct">
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input v-model="product.nombre" type="text" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Precio</label>
      <input v-model="product.precio" type="number" step="0.01" class="form-control" required />
    </div>

    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? 'Actualizar' : 'Registrar' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { productService } from '../services/modules/moduleProducts'
import { alertSuccess, alertError } from '../utils/helpers'

const props = defineProps({
  productToEdit: Object
})
const emit = defineEmits(['saved'])

const product = ref({ nombre: '', precio: '' })
const isEditing = ref(false)

// Detectar si se pasa un producto para editar
watch(() => props.productToEdit, (newVal) => {
  if (newVal) {
    product.value = { ...newVal }
    isEditing.value = true
  } else {
    product.value = { nombre: '', precio: '' }
    isEditing.value = false
  }
}, { immediate: true })

const saveProduct = async () => {
  try {
    if (isEditing.value) {
      await productService.update(product.value.id, product.value)
      alertSuccess('Producto actualizado correctamente')
    } else {
      await productService.create(product.value)
      alertSuccess('Producto registrado con éxito')
    }
    emit('saved')
  } catch (err) {
    alertError('Hubo un problema al guardar el producto')
  }
}
</script>
