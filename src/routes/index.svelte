<script>
	import Chat from '../components/chat.svelte';
	import User from '../components/user.svelte';
</script>

<div class="w-full min-h-full bg-blue-500 flex flex-col justify-between">
	<div class="bg-white px-4 py-2 flex justify-between">
		<h1 class="text-xl">Chat App</h1>
		<User />
	</div>
	<div class="p-4">
		<Chat />
	</div>
</div>
