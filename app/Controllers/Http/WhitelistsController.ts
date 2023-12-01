// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RequestWl from 'App/Models/RequestWl'
import axios from 'axios'
export default class WhitelistsController {
  public async index({ view, auth, response }) {
    try {
      await auth.use('web').authenticate()
      const guildId = '1176659914173710396'
      //   const token = auth.user.accessToken
      //   console.log(token)

      //   const guildMemberResponse = await axios.get(
      //     `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )

      //   const userRoles: string[] = guildMemberResponse.data.roles
      // userRoles.includes('1176865253447974992')
      const douanier = true
      return view.render('whitelist', { douanier, successMessage: false })
    } catch (error) {
      console.log(error)
    }
  }

  public async submitForm({ request, response, auth , view}) {
    const formData = request.all() // Récupère toutes les données du formulaire
    console.log(formData) // Affiche les données dans la console (pour débogage)

    await auth.use('web').authenticate()
    const user = auth.user
    console.log(user)

    const existingRequest = await RequestWl.query().where('user_id', user.id).first();

    if (existingRequest) {
        // L'utilisateur a déjà fait une demande, vous pouvez gérer cela selon vos besoins.
        console.log("L'utilisateur a déjà fait une demande.");

        // Redirigez l'utilisateur ou renvoyez une réponse avec un message d'erreur, par exemple.
        const errorMessage = 'Vous avez déjà soumis une demande.';
        return response.redirect(`/whitelist?message=${encodeURIComponent(errorMessage)}`);
    }

    const requestWl = new RequestWl()
    requestWl.fill({
      lastname: formData['nom_rp'],
      firstname: formData['prenom_rp'],
      job: formData['job_souhaite'],
      jobType: formData['type_job'],
      birthday: formData['date_anniversaire'],
      background: formData['background_personnage'],
    })
    await user.related('requestWl').save(requestWl)

    // Vous pouvez maintenant utiliser les données pour effectuer des opérations en base de données, etc.

    // Redirigez l'utilisateur ou renvoyez une réponse, selon vos besoins

    const successMessage = 'Votre demande a bien été envoyée';
    return response.redirect(`/whitelist?message=${encodeURIComponent(successMessage)}`);

  }
}
