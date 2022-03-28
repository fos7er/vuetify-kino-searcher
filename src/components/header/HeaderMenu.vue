<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab text>
        <v-avatar size="30">
          <img src="@/assets/images/avatar-placeholder.svg" alt="Avatar" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item exact to="/registration">
        <v-list-item-action>
          <v-icon>mdi-account-check</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('registration')" />
      </v-list-item>
      <v-divider />
      <v-list-item exact to="/login">
        <v-list-item-action>
          <v-icon>mdi-account-key</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('login')" />
      </v-list-item>
      <v-divider />
      <v-list-item exact to="/profile">
        <v-list-item-action>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('profile')" />
      </v-list-item>
      <v-divider />
      <v-list-item exact to="/profile/settings">
        <v-list-item-action>
          <v-icon>mdi-tune-variant</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('settings')" />
      </v-list-item>
      <v-divider />
      <v-list-item exact to="/logout">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="$t('logout')" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
