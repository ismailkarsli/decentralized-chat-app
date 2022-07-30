<script>
	import gun from '../libs/gun';
	import { auth } from '../stores/auth';

	const ref = gun.get('messages');
	let store = {};
	let messageInput = '';

	ref.map().on((message, id) => {
		if (message) {
			store[id] = message;
		} else {
			delete store[id];
		}
	});

	const submitMessage = (event) => {
		event.preventDefault();
		if (!messageInput) return;
		ref.set({
			text: messageInput,
			user: $auth.alias,
			timestamp: Date.now()
		});
		messageInput = '';
	};

	$: messages = Object.values(store);
</script>

<div class="w-full h-full bg-blue-500 flex flex-col gap-4 justify-between">
	<div class="flex flex-col gap-2">
		{#each messages as message}
			<div
				id={message.id}
				class="relative self-start flex flex-col max-w-[80%] xl:max-w-[50%] bg-blue-50 p-2 rounded-md"
				class:self-end={message.user === $auth.alias}
			>
				{#if message.user !== $auth.alias}
					<div class="text-xs">{message.user}</div>
				{/if}
				<div>{message.text}</div>
			</div>
		{/each}
	</div>
	{#if $auth.id}
		<form class="w-full flex rounded-md" on:submit={submitMessage}>
			<input
				type="text"
				bind:value={messageInput}
				class="appearance-none text-sm bg-blue-300 hover:bg-blue-200 focus:bg-blue-200 w-full p-4 rounded-l-md"
			/>
			<button class="px-6 bg-blue-50 text-black rounded-r-md">Send</button>
		</form>
	{/if}
</div>
