import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import MATERIAL from '../src/constants/Materials';
import TP_CONSTANTS from '../src/constants/TPItem';
import idsHelper from '../src/helpers/idsHelper';
import styles from '../styles/Home.module.css'
export default function Home() {
    const [materials, setMaterials] = useState({});
    const t6Ids = idsHelper.t6Ids();
    useEffect(() => {
        const controller = new AbortController();
        const setup = async () => {
            const response = await fetch('https://api.guildwars2.com/v2/commerce/prices?ids=24358,24351,24277,24357,24289,24300,24283,24295', { signal: controller.signal });
            if (response.ok) {
                const materials = await response.json();
                const dictionary = {};
                materials.forEach(element => {
                    dictionary[element[TP_CONSTANTS.TPITEM.ID]] = element;
                });
                setMaterials(dictionary);
            }
        }
        setup();
    }, []);
    console.log({ materials })
    const t6mats = Object.values(MATERIAL.T6);
    let t6setPrice = 0;
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>


                <Table bordered>
                    <thead>
                        {
                            t6mats.map((mat, index) => {
                                return (
                                    <th key={index}>{mat.NAME}</th>
                                )
                            })}
                    </thead>
                    <tbody>
                        <tr>

                            {t6mats.map((mat, index) => {
                                return (
                                    <td key={index}>{materials?.[mat.ID]?.[TP_CONSTANTS.TPITEM.BUY_ORDERS]?.[TP_CONSTANTS.BUY_ORDER.UNIT_PRICE] / 100}s / {materials?.[mat.ID]?.[TP_CONSTANTS.TPITEM.SELL_ORDERS]?.[TP_CONSTANTS.SELL_ORDER.UNIT_PRICE] / 100}s </td>
                                )
                            })}
                        </tr>
                        <tr>
                            {t6mats.map((mat, index) => {
                                const price = materials?.[mat.ID]?.[TP_CONSTANTS.TPITEM.BUY_ORDERS]?.[TP_CONSTANTS.BUY_ORDER.UNIT_PRICE] * 250 / 100 / 100;
                                t6setPrice = t6setPrice + price;
                                return (
                                    <td key={index}>{price}G </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </Table>
                <p>T6Set {t6setPrice}</p>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                    crossOrigin="anonymous"
                />
            </footer>
        </div>
    )
}
