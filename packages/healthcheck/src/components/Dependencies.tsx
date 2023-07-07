// import { Dependency,Status } from '@/lib/check-health'
// import styled from 'styled-components'
// import { Text } from '@opencrvs/components/lib/Text'
// import React from 'react'

// const Table = styled.table`
//   td,
//   th {
//     padding: 8px;
//     text-align: left;
//   }
// `

// export const Dependencies = ({ dependencies }: { dependencies: Dependency[] }) => {
//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>
//             <Text variant="bold18" element="span">
//               Dependency
//             </Text>
//           </th>
//           <th>
//             <Text variant="bold18" element="span">
//               URL
//             </Text>
//           </th>
//           <th>
//             <Text variant="bold18" element="span">
//               Status
//             </Text>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {dependencies.map((dependency) => (
//           <tr key={dependency.name}>
//             <td>{dependency.name}</td>
//             <td>{dependency.url}</td>
//             <td>{dependency.status === Status.OK ? '✅' : '❌'}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   )
// }
import styles from '../styles/styles.module.css';
import { Box, Content, Frame, Spinner, Text } from "@opencrvs/components";
import { Icon } from "@opencrvs/components/lib/Icon";
import {
    StatusGreen,
    StatusWaitingValidation,
} from "@opencrvs/components/lib/icons";
import { useEffect, useState } from "react";

// import { login } from "./checks";
import Navigation from '../components/Navigation';

import { Table } from '@opencrvs/components/lib/Table'
import { Success } from '@opencrvs/components/lib/icons/Success'
import { ArrowDown } from '@opencrvs/components/lib/icons';
import { LoadingGrey } from '@opencrvs/components';
import { Offline } from '@opencrvs/components/lib/icons';
import { checkHealth } from '@/lib/check-health';
// import { generateOpenHIMCredentials, getChannels } from "./openhim";
// working start
type Status = "LOADING" | "OK" | "FAIL";
type Service = {
    name: string;
    url: string;
    status: Status;
    type?: "dependency" | "service";
    acceptedStatusCodes?: number[];
    icon: JSX.Element;
};


async function getCountryConfig(): Promise<{ COUNTRY: string }> {
    const res = await fetch(
        new URL("/client-config.js", "http://localhost:3040").href
    );
    if (!res.ok) {
        throw new Error(`Could not fetch config, ${res.statusText} ${res.status}`);
    }
    return Function(
        `let window={}; ${await res.text()} ; return window.config`
    )();
}

// const loginPromise = login();

function Check<T = any>({
    check,
    ok,
    fail,
    instructions,
}: {
    check: () => Promise<T>;
    ok: (result: T) => React.ReactNode;
    fail: (result: Error) => React.ReactNode;
    instructions?: React.ReactNode;
}) {
    const [status, setStatus] = useState<Status>("LOADING");
    const [result, setResult] = useState<T | null>(null);
    const [icon, setIcon] = useState<JSX.Element | null>(null);
    useEffect(() => {
        check()
            .then((result) => {
                setResult(result as T);
                setStatus("OK");
                setIcon(<Success />);
            })
            .catch((err) => {
                setResult(err);
                setStatus("FAIL");
                setIcon(<Offline />);
            });
    }, []);

    if (status === "LOADING") {
        return <Spinner size={20} id="spin" />;
    }
    return (
        <div className="check">
            {status === "OK" ? (
                <Icon name={"Activity"} color="green" />
            ) : (
                <Icon color="red" name={"Activity"} />
            )}
            <div>
                {status === "OK" ? ok(result as T) : fail(result as Error)}
                {status === "FAIL" && instructions && (
                    <div className="instructions">{instructions}</div>
                )}
            </div>
        </div>
    );
}


export function MyEnvironment() {
    const [state, setState] = useState({
        someDevServerRunning: false,
        loggedIn: false,
    });

    useEffect(() => {
        const img = new Image();
        img.src = "http://localhost:3000/assets/sample-signature.png";
        img.onload = () => {
            setState((s) => ({ ...s, someDevServerRunning: true }));
        };
        // loginPromise.then(() => {
        //   setState((s) => ({ ...s, loggedIn: true }));
        // });
    }, []);

    const [services, setServices] = useState<{
        [name: string]: Service;
    }>({
        auth: {
            name: "auth",
            url: "http://localhost:7070/ping?service=auth",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        user: {
            name: "user",
            url: "http://localhost:7070/ping?service=user",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        webhooks: {
            name: "webhooks",
            url: "http://localhost:7070/ping?service=webhooks",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        notification: {
            name: "notification",
            url: "http://localhost:7070/ping?service=notification",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        gateway: {
            name: "gateway",
            url: "http://localhost:7070/ping?service=gateway",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        workflow: {
            name: "workflow",
            url: "http://localhost:7070/ping?service=workflow",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        search: {
            name: "search",
            url: "http://localhost:7070/ping?service=search",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        countryconfig: {
            name: "countryconfig",
            url: "http://localhost:7070/ping?service=countryconfig",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        metrics: {
            name: "metrics",
            url: "http://localhost:7070/ping?service=metrics",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        client: {
            name: "client",
            url: "http://localhost:7070/ping?service=client",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        login: {
            name: "login",
            url: "http://localhost:7070/ping?service=login",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        config: {
            name: "config",
            url: "http://localhost:7070/ping?service=config",
            status: "LOADING",
            type: "service",
            icon: <LoadingGrey />
        },
        openhim: {
            name: "openhim",
            acceptedStatusCodes: [200, 404],
            url: "http://localhost:7070/ping?service=openhim",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        MongoDB: {
            name: "MOngoDB",
            url: "https://stackoverflow.com/questions/37839365/simple-http-tcp-health-check-for-mongodb/37852368#37852368",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        Influx: {
            name: "Influx",
            url: "localhost:8086/ping",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        Minio: {
            name: "Minio",
            url: "https://docs.min.io/minio/baremetal/monitoring/healthcheck-probe.html",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        Kibana: {
            name: "Kibana",
            url: "https://docs.min.io/minio/baremetal/monitoring/healthcheck-probe.html",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },
        Elasticsearch: {
            name: "Elasticsearch",
            url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-health.html#cat-health-api-request",
            status: "LOADING",
            type: "dependency",
            icon: <LoadingGrey />
        },



    });




    useEffect(() => {
        function setHealthy(service: Service) {
            setServices((services) => ({
                ...services,
                [service.name]: { ...service, status: "OK", icon: <Success /> },
            }));
        }
        function setFailing(service: Service) {
            setServices((services) => ({
                ...services,
                [service.name]: { ...service, status: "FAIL", icon: <Offline /> },
            }));
        }
        console.log(services);
        Object.values(services).forEach((service) => {
            fetch(service.url)
                .then((res) => {
                    if (
                        (service.acceptedStatusCodes &&
                            service.acceptedStatusCodes.includes(res.status)) ||
                        res.status === 200
                    ) {
                        return setHealthy(service);
                    }

                    setFailing(service);
                })
                .catch((err) => {
                    setFailing(service);
                });
        });


    }, []);

    // async function getHearthLocations() {
    //     const { token } = await loginPromise;
    //     return await fetch("http://localhost:5001/fhir/Location", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     }).then((res) => res.json());
    // }

    // function loginToOpenHIM(username: string, password: string) {
    //     return generateOpenHIMCredentials({
    //         username,
    //         password,
    //         apiURL: "https://localhost:8080",
    //     });
    // }

    // function tryOpenHIMPassword(password: string) {
    //     return loginToOpenHIM("root@openhim.org", password).then(getChannels);
    // }

    // working end











    return (
        <div style={{ height: "95vh", width: "100%" }}>
            <Frame navigation={<Navigation />} header={null} skipToContentText={""}>
                <Frame.Layout>
                    <Frame.Section>
                        {/* <Box id="Box">
                            <Text variant="h4" element="span">
                                Services
                            </Text>

                            <ul className={styles['service-list']} >
                                {Object.values(services)
                                    .filter((s) => s.type === "service")
                                    .map((service) => (
                                        <li key={service.name} className="service">
                                            <span className="service-name">{service.name}</span>
                                            {service.status === "LOADING" ? (
                                                <Spinner id="Loader" size={20} />
                                            ) : service.status === "OK" ? (
                                                <div className="status">
                                                    <span style={{ color: "green" }}>{new URL(service.url).port}</span>
                                                    <StatusGreen />
                                                </div>
                                            ) : (
                                                <div className="status">
                                                    <span style={{ color: "red" }}>{new URL(service.url).port}</span>
                                                    <StatusWaitingValidation />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                            </ul>

                        </Box> */}
                        {/* <Box id="Box">
                            <Text variant="h4" element="span">
                                Dependencies
                            </Text>
                            <ul className={styles['service-list']}>
                                {Object.values(services)
                                    .filter((s) => s.type === "dependency")
                                    .map((service) => (
                                        <li key={service.name} className="service">
                                            <span className="service-name">{service.name}</span>
                                            {service.status === "LOADING" ? (
                                                <Spinner id="Loader" size={20} />
                                            ) : service.status === "OK" ? (
                                                <div className="status">
                                                    <span style={{ color: "green" }}>
                                                        {new URL(service.url).port}
                                                    </span>
                                                    <StatusGreen />
                                                </div>
                                            ) : (
                                                <div className="status">
                                                    <span style={{ color: "red" }}>
                                                        {new URL(service.url).port}
                                                    </span>
                                                    <StatusWaitingValidation />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                            </ul>


                        </Box> */}

                        <Table
                            tableHeight={500}
                            columns={[
                                { label: 'Service', width: 50, key: 'service' },
                                { label: 'Status', width: 30, key: 'status' },
                                { label: 'Icon', width: 20, key: 'icon' }
                            ]}
                            content={Object.values(services)
                                .filter((s) => s.type === "service")
                                .map((service) => ({
                                    service: service.name,
                                    status: service.status,
                                    icon: service.icon
                                }))
                            }
                        />

                        <Table
                            tableHeight={500}
                            columns={[
                                { label: 'Dependency', width: 50, key: 'dependency' },
                                { label: 'Status', width: 30, key: 'status' },
                                { label: 'Icon', width: 20, key: 'icon' }
                            ]}
                            content={Object.values(services)
                                .filter((s) => s.type === "dependency")
                                .map((service) => ({
                                    dependency: service.name,
                                    status: service.status,
                                    icon: service.icon
                                }))
                            }
                        />




                    </Frame.Section>
                </Frame.Layout>
            </Frame>
        </div>
    );
}