        if (userError || !userData) {
          // Se não existe, criar o registro
          const trialEndsAt = new Date()
          trialEndsAt.setDate(trialEndsAt.getDate() + 3)

          await supabase
            .from('users')
            .upsert({
              id: data.user.id,
              email: email,
              name: data.user.user_metadata?.name || 'Usuário',
              plan_type: 'free',
              trial_ends_at: trialEndsAt.toISOString(),
              skin_type: null,
              avatar: null
            })
        }