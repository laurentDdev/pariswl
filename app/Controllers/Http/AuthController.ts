import axios from "axios";
import User from "App/Models/User";

export default class AuthController {
  public async redirectToDiscord({ ally }) {
    await ally.use('discord').redirect()
  }

  public async handleDiscordCallback({ ally, auth, response }) {
    try {
      const discord = ally.use('discord')

      if (discord.accessDenied()) {
        return 'Access was denied'
      }

      if (discord.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      if (discord.hasError()) {
        return discord.getError()
      }

      const discordUser = await discord.user()

      // Récupérer les rôles du serveur Discord
      const guildId = '1176659914173710396'
      const guildMemberResponse = await axios.get(
        `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
        {
          headers: {
            Authorization: `Bearer ${discordUser.token.token}`,
          },
        }
      )

      const userRoles: string[] = guildMemberResponse.data.roles

      // Logique d'authentification dans votre application Adonis.js

      const user = await User.firstOrCreate({
          email: discordUser.email,
        },
        {
          email: discordUser.email,
          name: discordUser.name,
          accessToken: discordUser.token.token,
          isVerified: discordUser.emailVerificationState === 'verified',
          douanier: userRoles.includes('1176865253447974992'),
        }
      )

      await auth.use('web').login(user, true)

      return response.redirect('/whitelist')

      // Rediriger l'utilisateur après l'authentification
    } catch (error) {

      // Vérifier si l'erreur est due à un token expiré
      if (error.response && error.response.status === 401) {
        // Rediriger l'utilisateur pour renouveler le token
        return response.redirect('/discord/redirect')
      }

      console.log(error)
    }
  }
}
