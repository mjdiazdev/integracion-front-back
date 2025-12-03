<template>
  <div class="card shadow-sm">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="m-0">Lista de Productos</h5>
      <button class="btn btn-success btn-sm" @click="$emit('new')">Nuevo</button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ formatCurrency(p.precio) }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', p)">
                Editar
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteProduct(p)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productService } from '../services/modules/moduleProducts'
import { confirmDelete, alertSuccess, alertError, formatCurrency } from '../utils/helpers'

const products = ref([])

const loadProducts = async () => {
  try {
    const data = await productService.getAll()
    products.value = data
  } catch (err) {
    alertError('Error al cargar los productos')
  }
}

const deleteProduct = async (p) => {
  const confirmed = await confirmDelete(`el producto "${p.name}"`)
  if (!confirmed) return
  try {
    await productService.remove(p.id)
    alertSuccess('Producto eliminado correctamente')
    loadProducts()
  } catch (err) {
    alertError('Error al eliminar el producto')
  }
}

onMounted(loadProducts)

defineExpose({ loadProducts })
</script>
