let bgMusicOn = true;
let audio_bgMusic = document.createElement("audio");
let audioShoot = document.createElement("audio");
//let audioRobotLaser = document.createElement("audio");
let audioPickup = document.createElement("audio");

(function () {
    
    // workaround for not being able to use webworkers in Chrome over file:// protocol
    // based on answer here: https://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker
    
    function worker_function() {
        
        /* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*-
        *
        * Copyright (c) 2011-2013 Marcus Geelnard
        *
        * This software is provided 'as-is', without any express or implied
        * warranty. In no event will the authors be held liable for any damages
        * arising from the use of this software.
        *
        * Permission is granted to anyone to use this software for any purpose,
        * including commercial applications, and to alter it and redistribute it
        * freely, subject to the following restrictions:
        *
        * 1. The origin of this software must not be misrepresented; you must not
        *    claim that you wrote the original software. If you use this software
        *    in a product, an acknowledgment in the product documentation would be
        *    appreciated but is not required.
        *
        * 2. Altered source versions must be plainly marked as such, and must not be
        *    misrepresented as being the original software.
        *
        * 3. This notice may not be removed or altered from any source
        *    distribution.
        *
        */

        // minified using Google Closure Compiler
        var CPlayer=function(){var N=function(a){return Math.sin(6.283184*a)},G=[N,function(a){return.5>a%1?1:-1},function(a){return a%1*2-1},function(a){a=a%1*4;return 2>a?a-1:3-a}],w,H,A,t,l;this.init=function(a){w=a;H=a.endPattern;A=0;t=a.rowLen*a.patternLen*(H+1)*2;l=new Int32Array(t)};this.generate=function(){var a,f,g,b,h,k=new Int32Array(t),d=w.songData[A],u=w.rowLen,B=w.patternLen,I=0,C=0,m;var n=!1;var D=[];for(f=0;f<=H;++f){var x=d.p[f];for(g=0;g<B;++g){if(h=x?d.c[x-1].f[g]:0)d.i[h-1]=d.c[x-1].f[g+
        B]||0,16>h&&(D=[]);var W=G[d.i[15]],X=d.i[16]/512,Y=Math.pow(2,d.i[17]-9)/u,Z=d.i[18],O=d.i[19],aa=135.82764118168*d.i[20]/44100,ba=1-d.i[21]/255,J=1E-5*d.i[22],ca=d.i[23]/32,da=d.i[24]/512,ea=6.283184*Math.pow(2,d.i[25]-9)/u,P=d.i[26]/255,K=d.i[27]*u&-2;h=(f*B+g)*u;for(b=0;4>b;++b)if(a=x?d.c[x-1].n[g+b*B]:0){if(!D[a]){var c=D;var q=a;var Q=m=void 0,E,p,e=d,R=a,fa=G[e.i[0]],ha=e.i[1],ia=e.i[3],ja=G[e.i[4]],ka=e.i[5],la=e.i[8],S=e.i[9],v=e.i[10]*e.i[10]*4,F=e.i[11]*e.i[11]*4,L=e.i[12]*e.i[12]*4,ma=
        1/L,y=e.i[13],na=u*Math.pow(2,2-e.i[14]),T=new Int32Array(v+F+L),U=0,V=0;for(E=p=0;p<v+F+L;p++,E++){0<=E&&(y=y>>8|(y&255)<<4,E-=na,Q=.003959503758*Math.pow(2,(R+(y&15)+e.i[2]-128-128)/12),m=.003959503758*Math.pow(2,(R+(y&15)+e.i[6]-128-128)/12)*(1+8E-4*e.i[7]));var r=1;p<v?r=p/v:p>=v+F&&(r-=(p-v-F)*ma);var z=Q;ia&&(z*=r*r);U+=z;var M=fa(U)*ha;z=m;la&&(z*=r*r);V+=z;M+=ja(V)*ka;S&&(M+=(2*Math.random()-1)*S);T[p]=80*M*r|0}c[q]=T}q=D[a];a=0;for(c=2*h;a<q.length;a++,c+=2)k[c]+=q[a]}for(a=0;a<u;a++)b=2*
        (h+a),(c=k[b])||n?(n=aa,Z&&(n*=W(Y*b)*X+.5),n=1.5*Math.sin(n),I+=n*C,c=ba*(c-C)-I,C+=n*c,c=3==O?C:1==O?c:I,J&&(c*=J,c=1>c?-1<c?N(.25*c):-1:1,c/=J),c*=ca,n=1E-5<c*c,q=Math.sin(ea*b)*da+.5,m=c*(1-q),c*=q):m=0,b>=K&&(m+=k[b-K+1]*P,c+=k[b-K]*P),k[b]=m|0,k[b+1]=c|0,l[b]+=m|0,l[b+1]+=c|0}}A++;return A/w.numChannels};this.createWave=function(){var a=44+2*t-8,f=a-36,g=new Uint8Array(44+2*t);g.set([82,73,70,70,a&255,a>>8&255,a>>16&255,a>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,
        2,0,4,0,16,0,100,97,116,97,f&255,f>>8&255,f>>16&255,f>>24&255]);a=0;for(f=44;a<t;++a){var b=l[a];b=-32767>b?-32767:32767<b?32767:b;g[f++]=b&255;g[f++]=b>>8&255}return g};this.getData=function(a,f){for(var g=2*Math.floor(44100*a),b=Array(f),h=0;h<2*f;h+=1){var k=g+h;b[h]=0<a&&k<l.length?l[k]/32768:0}return b}};
        
        
        // SONG DATA
        let bgMusic = {
            songData: [
            { // Instrument 0
              i: [
              2, // OSC1_WAVEFORM
              100, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              3, // OSC2_WAVEFORM
              201, // OSC2_VOL
              128, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              0, // NOISE_VOL
              0, // ENV_ATTACK
              6, // ENV_SUSTAIN
              29, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              195, // LFO_AMT
              4, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              50, // FX_FREQ
              184, // FX_RESONANCE
              119, // FX_DIST
              244, // FX_DRIVE
              147, // FX_PAN_AMT
              6, // FX_PAN_FREQ
              84, // FX_DELAY_AMT
              6 // FX_DELAY_TIME
              ],
              // Patterns
              p: [1,1,1,2,1,1,1,2,3],
              // Columns
              c: [
                {n: [122,,,,,,,,117,,,,,,,,118,,,,,,,,115],
                 f: []},
                {n: [146,,,,,,134,,,,,,122,,,,,,122,,122,,122,,122,,122,,122,,122],
                 f: []},
                {n: [110],
                 f: []}
              ]
            },
            { // Instrument 1
              i: [
              2, // OSC1_WAVEFORM
              100, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              3, // OSC2_WAVEFORM
              201, // OSC2_VOL
              128, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              0, // NOISE_VOL
              5, // ENV_ATTACK
              6, // ENV_SUSTAIN
              58, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              195, // LFO_AMT
              6, // LFO_FREQ
              1, // LFO_FX_FREQ
              2, // FX_FILTER
              135, // FX_FREQ
              0, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              147, // FX_PAN_AMT
              6, // FX_PAN_FREQ
              121, // FX_DELAY_AMT
              6 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 2
              i: [
              2, // OSC1_WAVEFORM
              100, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              3, // OSC2_WAVEFORM
              201, // OSC2_VOL
              128, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              0, // NOISE_VOL
              5, // ENV_ATTACK
              6, // ENV_SUSTAIN
              58, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              195, // LFO_AMT
              6, // LFO_FREQ
              1, // LFO_FX_FREQ
              2, // FX_FILTER
              135, // FX_FREQ
              0, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              147, // FX_PAN_AMT
              6, // FX_PAN_FREQ
              121, // FX_DELAY_AMT
              6 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 3
              i: [
              3, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              140, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              127, // NOISE_VOL
              2, // ENV_ATTACK
              2, // ENV_SUSTAIN
              23, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              96, // LFO_AMT
              3, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              94, // FX_FREQ
              79, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              84, // FX_PAN_AMT
              2, // FX_PAN_FREQ
              12, // FX_DELAY_AMT
              4 // FX_DELAY_TIME
              ],
              // Patterns
              p: [,1,1,,,,1],
              // Columns
              c: [
                {n: [,,135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135],
                 f: []}
              ]
            },
            { // Instrument 4
              i: [
              0, // OSC1_WAVEFORM
              255, // OSC1_VOL
              116, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              120, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              127, // NOISE_VOL
              4, // ENV_ATTACK
              6, // ENV_SUSTAIN
              35, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              2, // FX_FILTER
              14, // FX_FREQ
              0, // FX_RESONANCE
              10, // FX_DIST
              32, // FX_DRIVE
              0, // FX_PAN_AMT
              0, // FX_PAN_FREQ
              0, // FX_DELAY_AMT
              0 // FX_DELAY_TIME
              ],
              // Patterns
              p: [,,,,1,1,1,1,1,1],
              // Columns
              c: [
                {n: [135,,,,,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135],
                 f: []}
              ]
            },
            { // Instrument 5
              i: [
              0, // OSC1_WAVEFORM
              160, // OSC1_VOL
              128, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              160, // OSC2_VOL
              128, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              210, // NOISE_VOL
              4, // ENV_ATTACK
              7, // ENV_SUSTAIN
              41, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              60, // LFO_AMT
              4, // LFO_FREQ
              1, // LFO_FX_FREQ
              2, // FX_FILTER
              255, // FX_FREQ
              0, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              61, // FX_PAN_AMT
              5, // FX_PAN_FREQ
              32, // FX_DELAY_AMT
              6 // FX_DELAY_TIME
              ],
              // Patterns
              p: [,,,,1,1,1,1],
              // Columns
              c: [
                {n: [,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135],
                 f: []}
              ]
            },
            { // Instrument 6
              i: [
              0, // OSC1_WAVEFORM
              0, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              0, // OSC2_VOL
              128, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              125, // NOISE_VOL
              0, // ENV_ATTACK
              1, // ENV_SUSTAIN
              59, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              1, // FX_FILTER
              193, // FX_FREQ
              171, // FX_RESONANCE
              0, // FX_DIST
              29, // FX_DRIVE
              39, // FX_PAN_AMT
              3, // FX_PAN_FREQ
              88, // FX_DELAY_AMT
              3 // FX_DELAY_TIME
              ],
              // Patterns
              p: [,,1,1,1,1,1,1],
              // Columns
              c: [
                {n: [,,135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135],
                 f: []}
              ]
            },
            { // Instrument 7
              i: [
              0, // OSC1_WAVEFORM
              214, // OSC1_VOL
              104, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              204, // OSC2_VOL
              104, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              229, // NOISE_VOL
              4, // ENV_ATTACK
              40, // ENV_SUSTAIN
              21, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              231, // LFO_AMT
              6, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              183, // FX_FREQ
              15, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              232, // FX_PAN_AMT
              4, // FX_PAN_FREQ
              74, // FX_DELAY_AMT
              6 // FX_DELAY_TIME
              ],
              // Patterns
              p: [,,,,,,,,1],
              // Columns
              c: [
                {n: [135],
                 f: []}
              ]
            },
            ],
            rowLen: 5513,   // In sample lengths
            patternLen: 32,  // Rows per pattern
            endPattern: 9,  // End pattern
            numChannels: 8  // Number of channels
            };
        
        let fxShoot = {
          songData: [
            { // Instrument 0
              i: [
              3, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              140, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              127, // NOISE_VOL
              2, // ENV_ATTACK
              2, // ENV_SUSTAIN
              23, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              96, // LFO_AMT
              3, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              94, // FX_FREQ
              79, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              84, // FX_PAN_AMT
              2, // FX_PAN_FREQ
              12, // FX_DELAY_AMT
              4 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 1
              i: [
              0, // OSC1_WAVEFORM
              255, // OSC1_VOL
              106, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              106, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              0, // NOISE_VOL
              5, // ENV_ATTACK
              7, // ENV_SUSTAIN
              164, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              2, // FX_FILTER
              255, // FX_FREQ
              0, // FX_RESONANCE
              2, // FX_DIST
              32, // FX_DRIVE
              83, // FX_PAN_AMT
              5, // FX_PAN_FREQ
              25, // FX_DELAY_AMT
              1 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 2
              i: [
              3, // OSC1_WAVEFORM
              29, // OSC1_VOL
              140, // OSC1_SEMI
              0, // OSC1_XENV
              1, // OSC2_WAVEFORM
              24, // OSC2_VOL
              128, // OSC2_SEMI
              3, // OSC2_DETUNE
              0, // OSC2_XENV
              56, // NOISE_VOL
              73, // ENV_ATTACK
              24, // ENV_SUSTAIN
              28, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              3, // LFO_WAVEFORM
              40, // LFO_AMT
              5, // LFO_FREQ
              1, // LFO_FX_FREQ
              2, // FX_FILTER
              124, // FX_FREQ
              0, // FX_RESONANCE
              11, // FX_DIST
              124, // FX_DRIVE
              150, // FX_PAN_AMT
              3, // FX_PAN_FREQ
              24, // FX_DELAY_AMT
              0 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 3
              i: [
              1, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              1, // OSC2_WAVEFORM
              154, // OSC2_VOL
              128, // OSC2_SEMI
              9, // OSC2_DETUNE
              0, // OSC2_XENV
              0, // NOISE_VOL
              7, // ENV_ATTACK
              5, // ENV_SUSTAIN
              52, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              2, // FX_FILTER
              255, // FX_FREQ
              0, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              47, // FX_PAN_AMT
              3, // FX_PAN_FREQ
              146, // FX_DELAY_AMT
              2 // FX_DELAY_TIME
              ],
              // Patterns
              p: [1],
              // Columns
              c: [
                {n: [116,116],
                 f: []}
              ]
            },
          ],
          rowLen: 5513,   // In sample lengths
          patternLen: 12,  // Rows per pattern (was 32)
          endPattern: 0,  // End pattern
          numChannels: 4  // Number of channels
        };
        
        let fxShootRobot = {
          songData: [
            { // Instrument 0
              i: [
              3, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              140, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              127, // NOISE_VOL
              2, // ENV_ATTACK
              2, // ENV_SUSTAIN
              23, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              96, // LFO_AMT
              3, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              94, // FX_FREQ
              79, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              84, // FX_PAN_AMT
              2, // FX_PAN_FREQ
              12, // FX_DELAY_AMT
              4 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 1
              i: [
              0, // OSC1_WAVEFORM
              255, // OSC1_VOL
              106, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              106, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              0, // NOISE_VOL
              5, // ENV_ATTACK
              7, // ENV_SUSTAIN
              164, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              2, // FX_FILTER
              255, // FX_FREQ
              0, // FX_RESONANCE
              2, // FX_DIST
              32, // FX_DRIVE
              83, // FX_PAN_AMT
              5, // FX_PAN_FREQ
              25, // FX_DELAY_AMT
              1 // FX_DELAY_TIME
              ],
              // Patterns
              p: [1],
              // Columns
              c: [
                {n: [147,,,,,135],
                 f: []}
              ]
            },
          ],
          rowLen: 5513,   // In sample lengths
          patternLen: 14,  // Rows per pattern (was 32)
          endPattern: 0,  // End pattern
          numChannels: 2  // Number of channels
        };
        
        let fxRobotLaser = {
          songData: [
            { // Instrument 0
              i: [
              3, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              140, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              127, // NOISE_VOL
              2, // ENV_ATTACK
              2, // ENV_SUSTAIN
              23, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              96, // LFO_AMT
              3, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              94, // FX_FREQ
              79, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              84, // FX_PAN_AMT
              2, // FX_PAN_FREQ
              12, // FX_DELAY_AMT
              4 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 1
              i: [
              0, // OSC1_WAVEFORM
              255, // OSC1_VOL
              106, // OSC1_SEMI
              1, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              106, // OSC2_SEMI
              0, // OSC2_DETUNE
              1, // OSC2_XENV
              0, // NOISE_VOL
              5, // ENV_ATTACK
              7, // ENV_SUSTAIN
              164, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              0, // LFO_AMT
              0, // LFO_FREQ
              0, // LFO_FX_FREQ
              2, // FX_FILTER
              255, // FX_FREQ
              0, // FX_RESONANCE
              2, // FX_DIST
              32, // FX_DRIVE
              83, // FX_PAN_AMT
              5, // FX_PAN_FREQ
              25, // FX_DELAY_AMT
              1 // FX_DELAY_TIME
              ],
              // Patterns
              p: [],
              // Columns
              c: [
              ]
            },
            { // Instrument 2
              i: [
              3, // OSC1_WAVEFORM
              29, // OSC1_VOL
              140, // OSC1_SEMI
              0, // OSC1_XENV
              1, // OSC2_WAVEFORM
              24, // OSC2_VOL
              128, // OSC2_SEMI
              3, // OSC2_DETUNE
              0, // OSC2_XENV
              56, // NOISE_VOL
              73, // ENV_ATTACK
              24, // ENV_SUSTAIN
              28, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              3, // LFO_WAVEFORM
              40, // LFO_AMT
              5, // LFO_FREQ
              1, // LFO_FX_FREQ
              2, // FX_FILTER
              124, // FX_FREQ
              0, // FX_RESONANCE
              11, // FX_DIST
              124, // FX_DRIVE
              150, // FX_PAN_AMT
              3, // FX_PAN_FREQ
              24, // FX_DELAY_AMT
              0 // FX_DELAY_TIME
              ],
              // Patterns
              p: [1],
              // Columns
              c: [
                {n: [147,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,146],
                 f: []}
              ]
            },
          ],
          rowLen: 5513,   // In sample lengths
          patternLen: 8,  // Rows per pattern (was 32)
          endPattern: 0,  // End pattern
          numChannels: 3  // Number of channels
        };
        
        let fxPickup = {
          songData: [
            { // Instrument 0
              i: [
              3, // OSC1_WAVEFORM
              255, // OSC1_VOL
              128, // OSC1_SEMI
              0, // OSC1_XENV
              0, // OSC2_WAVEFORM
              255, // OSC2_VOL
              140, // OSC2_SEMI
              0, // OSC2_DETUNE
              0, // OSC2_XENV
              127, // NOISE_VOL
              2, // ENV_ATTACK
              2, // ENV_SUSTAIN
              23, // ENV_RELEASE
              0, // ARP_CHORD
              0, // ARP_SPEED
              0, // LFO_WAVEFORM
              96, // LFO_AMT
              3, // LFO_FREQ
              1, // LFO_FX_FREQ
              3, // FX_FILTER
              94, // FX_FREQ
              79, // FX_RESONANCE
              0, // FX_DIST
              32, // FX_DRIVE
              84, // FX_PAN_AMT
              2, // FX_PAN_FREQ
              12, // FX_DELAY_AMT
              4 // FX_DELAY_TIME
              ],
              // Patterns
              p: [2],
              // Columns
              c: [
                {n: [147,,,,,135],
                 f: []},
                {n: [147,159],
                 f: []}
              ]
            },
          ],
          rowLen: 5513,   // In sample lengths
          patternLen: 6,  // Rows per pattern (was 32)
          endPattern: 0,  // End pattern
          numChannels: 1  // Number of channels
        };
    
        
        // Initialize music generation
        let player_bgMusic = new CPlayer();
        player_bgMusic.init(bgMusic);
        let player_fxShoot = new CPlayer();
        player_fxShoot.init(fxShoot);
        let player_fxShootRobot = new CPlayer();
        player_fxShootRobot.init(fxShootRobot);
        let player_fxRobotLaser = new CPlayer();
        player_fxRobotLaser.init(fxRobotLaser);
        let player_fxPickup = new CPlayer();
        player_fxPickup.init(fxPickup);

        let wavs = {
            bgMusic: {
                completed: false
            },
            fxShoot: {
                completed: false
            },
            fxShootRobot: {
                completed: false
            },
            fxRobotLaser: {
                completed: false
            },
            fxPickup: {
                completed: false
            },
        };
        completedTracks = 0;
        TOTAL_TRACKS = 5;
        
        // Generate music...
        while(completedTracks < TOTAL_TRACKS) {
            
            if (!wavs.bgMusic.completed && player_bgMusic.generate() >= 1) {
                wavs.bgMusic.wave = new Blob([player_bgMusic.createWave()]);
                wavs.bgMusic.completed = true;
                completedTracks++;
            }
            
            if (!wavs.fxShoot.completed && player_fxShoot.generate() >= 1) {
                wavs.fxShoot.wave = new Blob([player_fxShoot.createWave()]);
                wavs.fxShoot.completed = true;
                completedTracks++;
            }
            
            if (!wavs.fxShootRobot.completed && player_fxShootRobot.generate() >= 1) {
                wavs.fxShootRobot.wave = new Blob([player_fxShootRobot.createWave()]);
                wavs.fxShootRobot.completed = true;
                completedTracks++;
            }
            
            if (!wavs.fxRobotLaser.completed && player_fxRobotLaser.generate() >= 1) {
                wavs.fxRobotLaser.wave = new Blob([player_fxRobotLaser.createWave()]);
                wavs.fxRobotLaser.completed = true;
                completedTracks++;
            }
            
            if (!wavs.fxPickup.completed && player_fxPickup.generate() >= 1) {
                wavs.fxPickup.wave = new Blob([player_fxPickup.createWave()]);
                wavs.fxPickup.completed = true;
                completedTracks++;
            }
            
            if (completedTracks === TOTAL_TRACKS) { // all waves have been generated
                postMessage(wavs);
            }

        }
        
    }

    
    // only load audio once scene is ready - to speed up page load
    AFRAME.registerComponent("audio", {
        init: function () {

            // This is in case of normal worker start
            // "window" is not defined in web worker
            // so if you load this file directly using `new Worker`
            // the worker code will still execute properly
            if (window != self) {
                worker_function(); 
            }

            // audio - web worker
            let workerAudio = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
            workerAudio.onmessage = function (evt) {

                audio_bgMusic.setAttribute("loop", true);
                audio_bgMusic.src = URL.createObjectURL(evt.data.bgMusic.wave, {type: "audio/wav"});
                audio_bgMusic.volume = 0.4;

                let firstTime = true;
                document.body.addEventListener("click", function () {
                    if (firstTime) {
                        firstTime = false;
                        if (bgMusicOn) {
                            audio_bgMusic.play(); 
                        }
                    }
                });
                document.body.addEventListener("keydown", function () {
                    if (firstTime) {
                        firstTime = false;
                        if (bgMusicOn) {
                            audio_bgMusic.play();
                        }
                    }
                });

                audioShoot.src = URL.createObjectURL(evt.data.fxShoot.wave, {type: "audio/wav"});
                audioShoot.volume = 0.05;
                audioShootRobot.src = URL.createObjectURL(evt.data.fxShootRobot.wave, {type: "audio/wav"});
                //audioShootRobot.volume = 0.8;
                audioRobotLaser.src = URL.createObjectURL(evt.data.fxRobotLaser.wave, {type: "audio/wav"});
                //audioRobotLaser.volume = 0.2;
                audioPickup.src = URL.createObjectURL(evt.data.fxPickup.wave, {type: "audio/wav"});

            };
        }
    });

}());