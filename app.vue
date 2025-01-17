<script setup lang="ts">
import { ref } from "vue";
import { usePasswordReset } from "@/composables/usePasswordReset";

const userId = ref("");
const secret = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const { resetPassword, errorMessage, successMessage } = usePasswordReset();

function handleResetPassword() {
	resetPassword.mutate({
		userId: userId.value,
		secret: secret.value,
		newPassword: newPassword.value,
		confirmPassword: confirmPassword.value,
	});
}
</script>

<template>
	<div>
		<h1>Reset Your Password</h1>
		<form @submit.prevent="handleResetPassword">
			<label for="userId">User ID:</label>
			<input type="text" id="userId" v-model="userId" required />

			<label for="secret">Secret:</label>
			<input type="text" id="secret" v-model="secret" required />

			<label for="newPassword">New Password:</label>
			<input type="password" id="newPassword" v-model="newPassword" required />

			<label for="confirmPassword">Confirm Password:</label>
			<input type="password" id="confirmPassword" v-model="confirmPassword" required />

			<button type="submit" :disabled="resetPassword.isLoading">Reset Password</button>
		</form>
		<p v-if="successMessage">{{ successMessage }}</p>
		<p v-if="errorMessage">{{ errorMessage }}</p>
	</div>
</template>