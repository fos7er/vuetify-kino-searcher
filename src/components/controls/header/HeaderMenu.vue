<template>
  <div>
    <v-menu left offset-y transition="slide-y-transition">
      <template v-slot:activator="{on, value}">

        <v-btn v-if="breakpoint" elevation="0" v-on="on" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <v-btn v-else elevation="0" v-on="on" large style="text-transform:none;">
          <v-avatar size="30" class="mr-1">
            <img alt="Avatar" src="@/assets/images/avatar-placeholder.svg">
          </v-avatar>
          <slot name="user-name" class="d-none">
            <span v-if="isLoggedIn">{{ userName }}</span>
            <span v-else>{{ $t('login') }}</span>
          </slot>
          <v-icon right>
            {{ value ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>

      </template>
      <v-list>
        <v-list-item v-if="!isLoggedIn" exact to="/registration">
          <v-list-item-action>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="$t('registration')"/>
        </v-list-item>
        <v-divider/>
        <v-list-item v-if="!isLoggedIn" exact to="/login">
          <v-list-item-action>
            <v-icon>mdi-account-key</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="$t('login')"/>
        </v-list-item>
        <v-divider/>
        <v-list-item v-if="isLoggedIn" exact to="/profile">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="$t('profile')"/>
        </v-list-item>
        <v-divider/>
        <v-list-item v-if="isLoggedIn" exact to="/profile/settings">
          <v-list-item-action>
            <v-icon>mdi-tune-variant</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="$t('settings')"/>
        </v-list-item>
        <v-divider/>
        <v-list-item v-if="isLoggedIn" exact @click="logout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="$t('logout')"/>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-confirm ref="dialogConfirm"/>
  </div>
</template>

<script>

  export default {
    computed: {
      breakpoint () {
        return this.$vuetify.breakpoint.name === 'xs'
      }
    },
    methods: {
      async logout () {
        const confirmDialogText = {
          title: this.$t('logout'),
          message: this.$t('logoutConfirm')
        }
        try {
          if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
            await this.$store.dispatch('auth/logout')
            this.$router.push('/')
          }
        } finally {
          await this.$refs.dialogConfirm.loadingOver()
        }

      }
    }
  }
</script>
