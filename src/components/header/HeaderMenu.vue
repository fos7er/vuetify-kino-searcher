<template>
  <v-menu left offset-y transition="slide-y-transition">
    <template v-slot:activator="{on, value}">
      <v-btn elevation="0" v-on="on" large style="text-transform:none;">
        <v-avatar size="30" class="mr-1">
          <img alt="Avatar" src="@/assets/images/avatar-placeholder.svg">
        </v-avatar>
        <slot name="user-name">FosteR</slot>
        <v-icon right>
          {{ value ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item exact to="/registration">
        <v-list-item-action>
          <v-icon>mdi-account-check</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('registration')"/>
      </v-list-item>
      <v-divider/>
      <v-list-item exact to="/login">
        <v-list-item-action>
          <v-icon>mdi-account-key</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('login')"/>
      </v-list-item>
      <v-divider/>
      <v-list-item exact to="/profile">
        <v-list-item-action>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('profile')"/>
      </v-list-item>
      <v-divider/>
      <v-list-item exact to="/profile/settings">
        <v-list-item-action>
          <v-icon>mdi-tune-variant</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('settings')"/>
      </v-list-item>
      <v-divider/>
      <v-list-item exact to="/logout">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('logout')"/>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped></style>
