<script lang="ts">
  import { Colors } from '~/common'

  export let color: Colors = Colors.PURPLE
  export let isFullRounded = false
  export let noPadding = false

  const colorClasses = {
    [Colors.PURPLE]: 'border-purple-800 text-purple-800 hover:bg-purple-800',
    [Colors.DARK]: 'border-dark-800 text-dark-800 hover:bg-dark-800',
  }
</script>

<button
  class={`border-2 transition-all duration-300 hover:text-white transform active:rotate-12 active:shadow-xl px-4 py-2 ${colorClasses[color]}`}
  class:px-4={!noPadding}
  class:py-2={!noPadding}
  class:rounded-full={isFullRounded}
  class:rounded-xl={!isFullRounded}
  on:click
>
  <slot />
</button>
