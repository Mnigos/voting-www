<script lang="ts">
  import TiDelete from 'svelte-icons/ti/TiDelete.svelte'

  import Button from './Button.svelte'

  import { Colors } from '~/common'

  export let message: string
  export let isOpen = true
  export let onClick: () => void
</script>

<div
  class={`bg-red-600 p-4 rounded-xl opacity-100 opacity-0 transition-all duration-300 flex items-center justify-between transform active:rotate-6 gap-8 shadow-2xl ${$$restProps.class}`}
  class:opacity-100={isOpen}
  class:opacity-0={!isOpen}
>
  <p>{message}</p>

  <Button color={Colors.DARK} on:click={onClick()} isFullRounded noPadding>
    <div class="w-[32px] h-[32px]">
      <TiDelete />
    </div>
  </Button>
</div>
