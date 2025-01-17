import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { account } from "@/lib/appwrite";

export function usePasswordReset() {
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);


const resetPassword = useMutation({
   mutationKey: ["resetPassword"],
   mutationFn: async ({
      userId,
      secret,
      newPassword,
      confirmPassword,
   }: {
      userId: string;
      secret: string;
      newPassword: string;
      confirmPassword: string;
   }) => {
      // Complete the password reset
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
   },
   onSuccess() {
      successMessage.value = "Password has been successfully reset.";
   },
   onError(error) {
      console.error("Error resetting password:", error);
      errorMessage.value = "Failed to reset the password. Check the details.";
   },
});

return {
   resetPassword,
   errorMessage,
   successMessage,
};
}
