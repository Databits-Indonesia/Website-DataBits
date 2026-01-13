import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'DataBits - Data Science & AI Solutions'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
            border: '4px solid white',
          }}
        >
          <div
            style={{
              background: 'black',
              color: 'white',
              fontSize: 60,
              fontWeight: 'bold',
              padding: '20px 40px',
              letterSpacing: '8px',
            }}
          >
            DATA
          </div>
          <div
            style={{
              background: 'white',
              color: 'black',
              fontSize: 60,
              fontWeight: 'bold',
              padding: '20px 40px',
              letterSpacing: '4px',
            }}
          >
            BITS
          </div>
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            color: '#94a3b8',
            textAlign: 'center',
          }}
        >
          Data Science & AI Solutions
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
