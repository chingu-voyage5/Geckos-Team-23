<template>
    <div class="tile">
        <div class="tile-header">
        <h2 >SIGN IN</h2>
    </div>
    <div class="tile-body">
        <form id="form">
            <label class="form-input">
                <i class="material-icons">email</i>
                    <input type="text" autofocus="true" required />
                    <span class="label">Email</span>
                <span class="underline"></span>
            </label>
            <label class="form-input">
                <i class="material-icons">lock</i>
                    <input type="password" required />
                    <span class="label">Password</span>
                <div class="underline"></div>
            </label>
            <div class="submit-container clearfix" style="margin-top: 2rem;">
                <div id="submit" role="button" type="button" class="btn btn-irenic float-right" tabindex="0">
                    <span>SIGN IN</span>
                </div>
                <br>
                <br>
                <p>Don't have an account? Create one here.</p>
                    <div class="login-pending">
                        <div class=spinner>
                            <span class="dot1"></span>
                            <span class="dot2"></span>
                        </div>
                    <div class="login-granted-content">
                        <i class="material-icons">done</i>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',
    data: function () {
        return {}
    },
    methods: {}
}
</script>
