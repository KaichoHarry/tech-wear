interface LoginPageBackgroundProps {
  imageUrl: string;
}

export function LoginPageBackground({ imageUrl }: LoginPageBackgroundProps) {
  return (
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );
}
