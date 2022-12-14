import { getSession, signOut } from 'next-auth/react';
import { BigNumber } from 'ethers';

import { sendTransaction, prepareSendTransaction } from '@wagmi/core'
import { InferGetServerSidePropsType } from "next";

const config = await prepareSendTransaction({
  request: { to: 'moxey.eth', value: BigNumber.from('10000000000000000') },
})
// const { hash } = await sendTransaction(config)

// gets a prop from getServerSideProps
function User({user}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: true })}>Sign out</button>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    
    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default User;
