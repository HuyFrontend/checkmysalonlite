/**
 *  @name L10n
 *  @description Localization
 *  @version 1.0
    var lang = $('html').attr('lang');
    L10[lang].required.usename -> "Please enter your name"
 */
var L10n = {
  // english,
  en: {
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha',
      firstName: 'Please enter your first name',
      lastName: 'Please enter your last name',
      fileUpload: 'Please select your resume',
      code: 'Please enter code'
    },
    invalid: {
      email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: [
          'Please enter your name',
          'Please enter your email',
          'Please enter valid email address',
          'Please enter message',
          'Please enter security code',
          'Your security code you have entered is not valid',
          'Cannot send your information, please try again!',
          'Send email successfully !',
          'Thanks for submitting your CV. We will review and contact you if your qualification match the open position!',
          'Please enter your firstname',
          'Please enter your lastname',
          'Please upload your resume'
        ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  },
  // french
  fr: {
    hello: 'bon jour',
    required: {
      username: 'Veuillez saisir votre nom',
      email: 'Veuillez saisir votre adresse email',
      comment: 'Veuillez saisir votre message',
      capcha: 'Veuillez saisir le code de securité',
      firstName: 'Veuillez saisir votre prénom',
      lastName: 'Veuillez saisir votre nom',
      fileUpload: 'Veuillez sélectionnez votre CV',
      code: 'Veuillez saisir le code de securité'
    },
    invalid: {
      email: 'Veuillez saisir une adresse email valide'
    },
    ajax: {
      contact: {
        code: [
          'Veuillez saisir votre nom',
          'Veuillez saisir votre adresse email',
          'Veuillez saisir une adresse email valide',
          'Veuillez saisir votre commentaire',
          'Veuillez saisir le code de securité',
          'Votre code de securite est invalid',
          'Impossible d’envoyer votre information. Veuillez réessayer plus tard',
          'Mail envoyé avec succes !',
          'Merci d’avoir envoyé votre CV. On vous contactera le plus tot possible!',
          'Veuillez saisir votre prénom',
          'Veuillez saisir votre nom',
          'Veuillez sélectionnez votre CV'
        ]
      }
    },
    text: {
      sending: 'En cours',
      send: 'Envoyer'
    }
  },
  // japan
  jp: {
    hello: 'hello',
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha',
      firstName: 'Please enter your first name',
      lastName: 'Please enter your last name',
      fileUpload: 'Please select your resume',
      code: 'Please enter code'
    },
    invalid: {
       email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: [
          'Please enter your name',
          'Please enter your email',
          'Please enter valid email address',
          'Please enter message',
          'Please enter security code',
          'Your security code you have entered is not valid',
          'Cannot send your information, please try again!',
          'Send email successful !',
          'Thanks for submitting your CV. We will review and contact you if your qualification match an open positions. !',
          'Please enter your firstname',
          'Please enter your lastname',
          'Please upload your resume'
        ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  }
};

