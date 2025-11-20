      // Buscar dados do usuário
      const { data: userData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUser(userData || user)