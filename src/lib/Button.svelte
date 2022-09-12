<script lang="ts">
  import { Colors } from '~/common'

  export let color: Colors = Colors.PURPLE
  export let isFullRounded = false
  export let noPadding = false
  export let isFilled = false
  export let isDisabled = false

  const colorClasses = {
    [Colors.PURPLE]: `border-purple-800 ${
      isFilled
        ? 'bg-purple-800 text-white'
        : 'hover:bg-purple-800 text-purple-800'
    }`,
    [Colors.DARK]: `border-dark-800 ${
      isFilled ? 'bg-dark-800 text-white' : 'hover:bg-dark-800 text-dark-800'
    }`,
    [Colors.GREEN]: `border-green-800 ${
      isFilled ? 'bg-green-800 text-white' : 'hover:bg-green-800 text-green-800'
    }`,
  }
</script>

<button
  class={`border-2 transition-all duration-300 hover:text-white text-white transform active:rotate-12 active:shadow-xl px-4 py-2 ${colorClasses[color]} ${$$restProps.class}`}
  class:px-4={!noPadding}
  class:py-2={!noPadding}
  class:transform={!isDisabled}
  class:cursor-not-allowed={isDisabled}
  class:rounded-full={isFullRounded}
  class:rounded-xl={!isFullRounded}
  disabled={isDisabled}
  on:click
>
  <slot />
</button>
