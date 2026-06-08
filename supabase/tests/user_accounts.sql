begin;

select plan(12);

select has_table('public', 'user_profiles');
select has_table('public', 'user_roles');
select has_table('public', 'user_sessions');
select has_table('public', 'user_verifications');
select has_table('public', 'login_attempts');
select has_column('public', 'users', 'is_guest');
select has_column('public', 'users', 'is_host');
select has_column('public', 'users', 'is_admin');
select col_is_pk('public', 'user_profiles', 'user_id');
select has_index('public', 'user_roles', 'user_roles_active_unique');
select has_index('public', 'login_attempts', 'login_attempts_email_created_idx');
select has_index('public', 'user_sessions', 'user_sessions_user_active_idx');

select * from finish();
rollback;
