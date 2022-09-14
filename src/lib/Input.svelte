<script lang="ts">
  export let label: string
  export let value: string
</script>

<label class="flex flex-col group">
  <p
    class="ml-1 text-gray-600 transform group-hover:-translate-x-16 group-hover:opacity-0 opacity-100 transition-all duration-300"
  >
    {label}
  </p>
  <input
    type="text"
    bind:value
    class="bg-dark-600 border-2 border-purple-800 rounded-xl focus:outline-none focus:ring p-2 focus:ring-purple-800 focus:border-purple-800"
  />
</label>
