import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('Website_Auto_Post')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('Columns found in Website_Auto_Post:');
    console.log(Object.keys(data[0]));
    console.log('Sample data:', data[0]);
  } else {
    console.log('Table is empty or no columns found.');
  }
}

check();
