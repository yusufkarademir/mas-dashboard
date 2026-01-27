import PocketBase from 'pocketbase';

async function testAuth() {
    const pb = new PocketBase('https://pb.yusuff.dev');
    
    const email = 'yusufkarademir@gmail.com';
    const pass = '21052017.Of';
    
    console.log('Testing Superuser (v0.22+)...');
    try {
        const authData = await pb.send('/api/collections/_superusers/auth-with-password', {
            method: 'POST',
            body: { identity: email, password: pass }
        });
        console.log('✅ Superuser success!');
        return;
    } catch (e) {
        console.log('❌ Superuser failed:', e.message, e.data);
    }

    console.log('Testing Normal User (users collection)...');
    try {
        const authData = await pb.collection('users').authWithPassword(email, pass);
        console.log('✅ Normal User success! (Note: Seeding might fail if not admin)');
        return;
    } catch (e) {
        console.log('❌ Normal User failed:', e.message, e.data);
    }
}

testAuth();
