<script>
	import { auth } from '../stores/auth';
	import gun from '../libs/gun';

	let user = gun.user();

	let modalActive = false;

	let error = null;
	let alias = '';
	let pass = '';

	const login = () => {
		if (!alias || !pass) {
			error = 'Please fill in all fields';
			return;
		}
		user.auth(alias, pass, (ack) => {
			if (ack.err) {
				error = ack.err;
				return;
			}
			auth.set({ alias: ack.put.alias, id: ack.put.pub });
			resetForm();
			modalActive = false;
		});
	};
	const register = () => {
		gun.get('~@' + alias).once((u) => {
			if (u) {
				error = 'Username already exists';
				return;
			}
			user.create(alias, pass, (ack) => {
				if (ack.err) {
					error = ack.err;
					return;
				}
				login();
			});
		});
	};

	const logout = () => {
		user.leave();
		auth.set({});
	};

	const resetForm = () => {
		alias = '';
		pass = '';
		error = null;
	};

	$: if (alias || pass) {
		error = null;
	}
</script>

{#if $auth.id}
	<div on:click={logout}>{$auth.alias}</div>
{:else}
	<div>
		<button type="button" on:click={() => (modalActive = true)}>Login</button>
	</div>
{/if}

{#if modalActive}
	<div
		class="fixed top-0 left-0 h-screen w-screen z-10 bg-white/50 flex justify-center items-center"
	>
		<div class="bg-white w-96 p-4 ">
			<div class="mb-4 flex justify-between items-center">
				<h1 class="text-2xl">Login</h1>
				<button class="text-lg" on:click={() => (modalActive = false)}>&#x2715;</button>
			</div>
			<form class="flex flex-col gap-6" on:submit|preventDefault={login}>
				<div>
					<label for="alias" class="block mb-1">Username</label>
					<input
						type="text"
						id="alias"
						bind:value={alias}
						class="appearance-none w-full border-2 border-solid border-gray-300 focus:border-blue-400 p-1 rounded"
					/>
				</div>
				<div>
					<label for="password" class="block mb-1">Password</label>
					<input
						type="password"
						id="password"
						bind:value={pass}
						class="appearance-none w-full border-2 border-solid border-gray-300 focus:border-blue-400 p-1 rounded"
					/>
				</div>
				{#if error}
					<div class="bg-red-50 text-red-500 p-2">{error}</div>
				{/if}
				<div class="flex gap-4">
					<button
						type="submit"
						class="w-full rounded p-2 bg-blue-500 hover:bg-blue-400 text-white"
						on:click={login}
					>
						Login
					</button>
					<button
						type="button"
						class="w-full rounded p-2 bg-teal-500 hover:bg-teal-400 text-white"
						on:click={register}
					>
						Create
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
