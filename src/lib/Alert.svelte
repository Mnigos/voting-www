<script lang="ts">
  import clsx from 'clsx'
  import TiDelete from 'svelte-icons/ti/TiDelete.svelte'

  import Button from './Button.svelte'

  import { Colors } from '~/common'

  export let message: string
  export let isOpen = true
  export let onClick: () => void
</script>

<div
  class={clsx(
    'bg-red-600 p-4 rounded-xl transition-all duration-300 flex items-center justify-between transform active:rotate-6 gap-8 shadow-2xl',
    isOpen ? 'opacity-100' : 'opacity-0',
    $$restProps.class
  )}
>
  <p>{message}</p>

  <Button color={Colors.DARK} on:click={onClick()} isFullRounded noPadding>
    <div class="w-[32px] h-[32px]">
      <TiDelete />
    </div>
  </Button>
</div>
