import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const GMAIL_USER = Deno.env.get('GMAIL_USER')!;     // sarabraymen@gmail.com
const GMAIL_PASS = Deno.env.get('GMAIL_APP_PASS')!; // Gmail App Password

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { name, email, role, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const client = new SMTPClient({
      connection: {
        hostname: 'smtp.gmail.com',
        port: 465,
        tls: true,
        auth: { username: GMAIL_USER, password: GMAIL_PASS },
      },
    });

    await client.send({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}${role ? ` — ${role}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#111">
          <h2 style="margin:0 0 24px;font-size:20px">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="padding:8px 0;color:#666;width:80px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${role ? `<tr><td style="padding:8px 0;color:#666">Role</td><td style="padding:8px 0">${role}</td></tr>` : ''}
          </table>
          <div style="background:#f5f5f5;border-radius:8px;padding:20px;font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</div>
          <p style="margin-top:24px;font-size:12px;color:#999">Sent from sarabraymen.com — hit reply to respond directly.</p>
        </div>
      `,
    });

    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
