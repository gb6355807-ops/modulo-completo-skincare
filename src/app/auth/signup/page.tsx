        // Atualizar o perfil do usuário na tabela users
        const { error: updateError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: email,
            name: name,
            plan_type: 'free',
            trial_ends_at: trialEndsAt.toISOString(),
            skin_type: null,
            avatar: null
          })