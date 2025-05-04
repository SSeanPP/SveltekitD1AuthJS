<script lang="ts">
    import { page } from '$app/state';
    import { SignIn } from "@auth/sveltekit/components"
    import { SignOut } from "@auth/sveltekit/components"
 </script>
  
 <div>
    <SignIn>
        <span slot="submitButton">Sign In with Google</span>
    </SignIn>
    <SignOut>
      	<span slot="submitButton">Signout</span>
    </SignOut>

	<p>test</p>

	<img src={page.data.session?.user?.image} alt="User avatar"/>
	{#if page.data.session?.user}
		<p>stuff</p>
	{/if}
 </div> 