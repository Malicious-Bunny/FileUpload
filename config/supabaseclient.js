const supabase = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey,
{
    headers: {
        Authorization: `Bearer ${supabaseKey}`,

    },
}
)

module.exports = supabaseClient