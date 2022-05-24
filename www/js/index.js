/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    var initialize = HarnessFFSDK.initialize
    var Event = HarnessFFSDK.Event

    var log = msg => {
        document.querySelector('#log').innerHTML += `${msg}\n`
        console.log(`${msg}\n`);
    }

    var cf = initialize(
        'cfe323a4-f3b9-4b85-9030-ecc73994cf4b',
        {
        identifier: 'Harness1',
            attributes: {
                lastUpdated: Date(),
                host: location.href
            }
        }
    )

    cf.on(Event.READY, flags => {
        log(JSON.stringify(flags, null, 2))
    })

    cf.on(Event.CHANGED, flagInfo => {
        if (flagInfo.deleted) {
            log('Flag is deleted')
            log(JSON.stringify(flagInfo, null, 2))
        } else {
            log('Flag is changed')
            log(JSON.stringify(flagInfo, null, 2))
        }
    })
}
